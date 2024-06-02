export const fetchFiles = async (path = '') => {
    const url = new URL(path);
    url.searchParams.append('t', Date.now()); // Append current timestamp as query parameter
    const response = await fetch(url, {
        method: 'GET',
        redirect: "follow"
    });
    if (!response.ok) {
        throw new Error('Failed to fetch files');
    }
    const data = await response.json();
    return data.content; // Assuming the API returns a 'content' array
};

export const fetchNotebook = async (path = '') => {
  const url = new URL(path);
  url.searchParams.append('t', Date.now()); // Append current timestamp as query parameter
  const response = await fetch(url, {
      method: 'GET',
      redirect: "follow",
      headers: {
          'Content-Type': 'application/json'
      }
  });

  const data = await response.json();
  return data;
}

export const createNotebook = async (path = '') => {
    const timestamp = Date.now();
    const notebookName = `notebook-${timestamp}.ipynb`;
    const notebookPath = `${path}/${notebookName}`;
  
    const initCells = [
        { 
            cell_type: 'markdown', 
            metadata: {},
            source: '# My Notebook' },
        { 
            cell_type: 'code', 
            execution_count: 1,
            metadata: {},
            outputs: [],
            source: '# SparkSession: spark is already created\nspark' },
    ];

    const notebookData = {
        type: 'notebook',
        content: {
            cells: initCells,
            metadata: {
                kernelspec: {
                    name: 'python3',
                    display_name: 'Python 3'
                },
                language_info: {
                    name: 'python'
                }
            },
            nbformat: 4,
            nbformat_minor: 4
        }
    };

    const response = await fetch(notebookPath, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(notebookData)
        });

        if (!response.ok) {
            throw new Error('Failed to create notebook');
        }
        const data = await response.json();
        return data;
};

export const deleteNotebook = async (path = '') => {
    console.log("Deleting notebook at path:", path);
    const response = await fetch(path, {
            method: 'DELETE'
        });
    
        if (!response.ok) {
            throw new Error('Failed to delete notebook');
        }
        const data = response.status !== 204 ? await response.json() : {};
        return data;
};

export const updateNotebook = async (path = '', content = {}) => {
  console.log("Updating notebook at path with content:", path, content);
  const updatedContent = { ...content };

  updatedContent.cells = updatedContent.cells.map(cell => {
    const updatedCell = { ...cell };
    delete updatedCell.isExecuted;
    return updatedCell;
    });

  const response = await fetch(path, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: updatedContent,
            type: 'notebook'
        })
    });

    if (!response.ok) {
        throw new Error('Failed to update notebook');
    }
    const data = await response.json();
    return data;
};

export const renameNotebook = async (basePath = '', path = '', newName = '') => {
    const newPath = path.substring(0, path.lastIndexOf("/") + 1) + newName;
    console.log("Renaming notebook at path:", path, "to:", newPath);
    const response = await fetch(basePath + path, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            path: newPath
        })
    });

    if (!response.ok) {
        throw new Error('Failed to rename notebook');
    }
    const data = await response.json();
    return data;
};

export const createSession = async (basePath = '', notebookPath = '') => {
    try {
        const response = await fetch(basePath + '/api/sessions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                notebook: { path: `${basePath}/${notebookPath}` },
                kernel: { id: null, name: 'python3' },
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // The response will contain the session data
        const session = await response.json();
        console.log('Session created:', session);
        // The kernel ID is in the 'id' property of the 'kernel' object
        const kernelId = session.kernel.id;

        // Return the kernal ID
        return kernelId;
    } catch (error) {
        console.error('Failed to create session:', error);
    }
};

export const handleWebSocketError = async (error, baseUrl, notebook, cell, cellStatus, setCellStatus) => {
    console.error('WebSocket connection error:', error);
    // Try to recreate the session
    try {
      const newKernelId = await createSession(baseUrl, notebook.path);
      // Try to run the cell again
      const result = await runCell(baseUrl, cell, newKernelId, cellStatus, setCellStatus);
      return { newKernelId, result };
    } catch (recreateError) {
      console.error('Failed to recreate session:', recreateError);
      throw recreateError;
    }
  };

export const runCell = async (basePath, cell, kernelId, cellStatus, setCellStatus) => {
    try {
        // Create a WebSocket connection to the kernel's channels endpoint
        const wsBasePath = basePath.replace(/^http/, 'ws');
        const socket = new WebSocket(`${wsBasePath}/api/kernels/${kernelId}/channels`);
        
        // Clear the cell's outputs array
        cell.outputs = [];

        // Listen for the error event
        socket.onerror = (error) => {
            console.error('WebSocket connection error:', error);
            handleWebSocketError(error, basePath, cell, kernelId, cellStatus, setCellStatus);
        };

        // Create a unique msg_id for this execution
        const msg_id = `execute_${Date.now()}`;

        // Wait for the connection to open
        await new Promise((resolve) => {
          socket.onopen = resolve;
        });
    
        // Send an execute_request message
        socket.send(JSON.stringify({
          header: {
            msg_id: msg_id,
            username: '',
            session: '',
            msg_type: 'execute_request',
            version: '5.2',
          },
          parent_header: {},
          metadata: {}, 
          content: {
            code: cell.source,
            silent: false,
            store_history: true,
            user_expressions: {},
            allow_stdin: false,
          },
        }));
    
        // Wait for the execute_result message
        const result = await new Promise((resolve) => {
          socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log('Received message:', message);
            // Only process messages that are in response to this execution
            if (message.parent_header.msg_id === msg_id) {
                if (message.header.msg_type === 'status') {
                    // Update the cell's status
                    setCellStatus(message.content.execution_state);
                    console.log('Cell status:', message.content.execution_state);
                }
                else if (message.header.msg_type === 'stream') {
                    // Add the output to the cell's outputs array
                    cell.outputs.push({
                        output_type: 'stream',
                        name: message.content.name,
                        text: message.content.text,
                    });
                } else if (message.header.msg_type === 'execute_result') {
                    // Add the output to the cell's outputs array
                    cell.outputs.push({
                        output_type: 'execute_result',
                        data: message.content.data,
                        execution_count: message.content.execution_count,
                        metadata: message.content.metadata,
                    });
                } else if (message.header.msg_type === 'error') {
                    // Add the output to the cell's outputs array
                    cell.outputs.push({
                        output_type: 'error',
                        ename: message.content.ename,
                        evalue: message.content.evalue,
                        traceback: message.content.traceback,
                    });
                }}
          };
        });
    
        // Close the WebSocket connection
        socket.close();
    
        return result;
      } catch (error) {
        if (error.message.includes('WebSocket connection to')) {
            console.error('Failed to connect to Jupyter kernel:', error);
            // Handle the connection error...
          } else {
            console.error('Error running cell:', error);
            // Handle other errors...
          }
      }
  };
