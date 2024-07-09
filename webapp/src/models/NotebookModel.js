import { CellStatus } from '../components/notebook/content/cell/CellStatus';
import { OutputType } from '../components/notebook/content/cell/result/OutputType';
import { CellExecuteResultType } from "../components/notebook/content/cell/CellExecuteResultType";
import { v4 as uuidv4 } from 'uuid';


class NotebookModel {
  constructor() {
  }

  static getNameWithoutExtension(name = '') {
    if (name.endsWith('.ipynb')) {
      return name.substring(0, name.length - 6);
    } else {
      return name;
    }
  }

  static getNameWithExtension(name = '') {
    if (name.endsWith('.ipynb')) {
      return name;
    } else {
      return name + '.ipynb';
    }
  }

  static async restartKernel(basePath = '', kernelId = '') {
    try {
        await fetch(`${basePath}/api/kernels/${kernelId}/restart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        let status;
        do {
          const response = await fetch(`${basePath}/api/kernels/${kernelId}`);
          const data = await response.json();
          status = data.execution_state;
          if (status === 'busy') {
            // Wait for a second before checking again
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        } while (status === 'busy');

        console.log('Kernel restart completed');
      } catch (error) {
        console.error('Failed to restart kernel:', error);
      }
  };

  static async getSession(basePath = '', notebookPath = '') {
    try {
        const response = await fetch(basePath + '/api/sessions', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const session = await response.json();
        const associatedSession = session.find(session => session.notebook.path === basePath + '/' + notebookPath);
        const kernelId = associatedSession
            .kernel.id;
        return kernelId;
    } catch (error) {
        console.error('Failed to get session:', error);
        return null;
    }
  };

  static async createSession(basePath = '', notebookPath = '') {
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

  static async handleWebSocketError(error, baseUrl, notebook, cell, cellStatus, setCellStatus) {
    console.error('WebSocket connection error:', error);
    // Try to recreate the session
    try {
      const newKernelId = await NotebookModel.createSession(baseUrl, notebook.path);
      // Try to run the cell again
      const result = await NotebookModel.runCell(baseUrl, cell, newKernelId, cellStatus, setCellStatus);
      return { newKernelId, result };
    } catch (recreateError) {
      console.error('Failed to recreate session:', recreateError);
      throw recreateError;
    }
  };

  static async fetchNotebook(path = '') {
    const response = await fetch("http://localhost:5002/notebook/" + path, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch notebook');
    }
    const data = await response.json();
    return data;
  }

  static async createNotebook(path = '', notebookName = '') {
    const response = await fetch("http://localhost:5002/notebook", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'name': notebookName,
          'path': path
        })
    });

    if (!response.ok) {
        throw new Error('Failed to create notebook');
    } else {
        const data = await response.json();
        return data;
    }
  }; 

  static async deleteNotebook(path = '') {
    const response = await fetch("http://localhost:5002/notebook/" + path, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok) {
        throw new Error('Failed to create notebook');
    } else {
        const data = await response.json();
        return data;
    }
  };
  
  static async updateNotebook(path = '', content = {}) {
    const updatedContent = { ...content };
  
    updatedContent.cells = updatedContent.cells.map(cell => {
      const updatedCell = { ...cell };
      return updatedCell;
      });

    // Check if notebook content.metadata has uuid
    if (!updatedContent.metadata.hasOwnProperty('uuid')) {
      updatedContent.metadata.uuid = uuidv4();
    }
  
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

  static async renameNotebook(basePath = '', path = '', newName = '') {
    console.log("Renaming notebook at path:", basePath + '/' + path, "to:", newName);
    
    const response = await fetch("http://localhost:5002/notebook/" + path, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'newName': newName
        })
    });

    if (!response.ok) {
        throw new Error('Failed to rename notebook');
    }
    const data = await response.json();
    return data;
  };

  static async moveNotebook(basePath = '', path = '', destination = '') {
    console.log("Moving notebook at path:", basePath + '/' + path, "to:", destination);
    const response = await fetch(basePath + '/' + path, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // 'type': 'notebook',
          'path': destination
        })
    });

    if (!response.ok) {
        throw new Error('Failed to move notebook');
    }
    const data = await response.json();
    return data;
  }

  static async runCell(
    basePath, 
    cell, 
    kernelId, 
    cellStatus, 
    setCellStatus) {
    try {
      setCellStatus(CellStatus.WAITING);
      // Create a WebSocket connection to the kernel's channels endpoint
      const wsBasePath = basePath.replace(/^http/, 'ws');
      const socket = new WebSocket(`${wsBasePath}/api/kernels/${kernelId}/channels`);
      
      // Clear the cell's outputs array
      if (cell.outputs) {
          cell.outputs = [];
      }

      // Listen for the error event
      socket.onerror = (error) => {
          console.error('WebSocket connection error:', error);
          NotebookModel.handleWebSocketError(error, basePath, cell, kernelId, cellStatus, setCellStatus);
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

      cell.lastExecutionResult = CellExecuteResultType.SUCCESS;
  
      // Wait for the execute_result message
      const result = await new Promise((resolve) => {
        socket.onmessage = (event) => {
          const message = JSON.parse(event.data);
          // Only process messages that are in response to this execution
          if (message.parent_header.msg_id === msg_id) {
              // console.log('Received message:', message);
              cell.lastExecutionTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
              if (message.header.msg_type === OutputType.STATUS) {
                  // Update the cell's status
                  setCellStatus(message.content.execution_state);
                  // If the kernel is idle, resolve the promise
                  if (message.content.execution_state === CellStatus.IDLE) {
                      resolve(cell.outputs);
                  }
              }
              else if (message.header.msg_type === OutputType.STREAM) {
                  // Add the output to the cell's outputs array
                  cell.outputs.push({
                      output_type: OutputType.STREAM,
                      name: message.content.name,
                      text: message.content.text,
                  });
              } else if (message.header.msg_type === OutputType.EXECUTE_RESULT) {
                  // Add the output to the cell's outputs array
                  cell.outputs.push({
                      output_type: OutputType.EXECUTE_RESULT,
                      data: message.content.data,
                      execution_count: message.content.execution_count,
                      metadata: message.content.metadata,
                  });
              } else if (message.header.msg_type === OutputType.ERROR) {
                  cell.lastExecutionResult = CellExecuteResultType.ERROR;
                  // Add the output to the cell's outputs array
                  cell.outputs.push({
                      output_type: OutputType.ERROR,
                      ename: message.content.ename,
                      evalue: message.content.evalue,
                      traceback: message.content.traceback,
                  });
              } else if (message.header.msg_type === OutputType.DISPLAY_DATA) {
                  // Add the output to the cell's outputs array
                  cell.outputs.push({
                      output_type: OutputType.DISPLAY_DATA,
                      data: message.content.data,
                      metadata: message.content.metadata,
                  });
              }
            }
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

  static async runAllAboveCells(
    index,
    jupyterBaseUrl, 
    notebook, 
    kernelId, 
    setKernelId, 
    cellStatuses, 
    setCellStatus,
    cellExecutedStatuses,
    setCellExecutedStatus
  ) {
    console.log('notebook:', notebook);
    NotebookModel.runAllCells(jupyterBaseUrl, notebook, kernelId, setKernelId, cellStatuses, setCellStatus, cellExecutedStatuses, setCellExecutedStatus, index);
  }

  static async runAllCells(
        jupyterBaseUrl, 
        notebook, 
        kernelId, 
        setKernelId, 
        cellStatuses, 
        setCellStatus,
        cellExecutedStatuses,
        setCellExecutedStatus,
        endCellIndex = notebook.content.cells.length
    ) {
    // Set all cell statuses to 'waiting'
    for (let i = 0; i < endCellIndex; i++) {
        const cell = notebook.content.cells[i];
        if (cell.cell_type === 'code') {
            setCellStatus(i, CellStatus.WAITING);
            cell.outputs = [];
        } else {
            console.log('Skipping cell:', cell);
        }
    }

    for (let i = 0; i < endCellIndex; i++) {
        const cell = notebook.content.cells[i];
        let newKernelId = kernelId;
        console.log('Running cell:', cell);
        if (cell.cell_type === 'code') {
            // If there's no kernel ID, create a new session
            if (!kernelId) {
                setCellStatus(i, CellStatus.INITIALIZING);
                newKernelId = await NotebookModel.createSession(jupyterBaseUrl, notebook.path);
                setKernelId(newKernelId);
            }
            // Call the API to run the cell
            const result = await NotebookModel.runCell(jupyterBaseUrl, cell, newKernelId, cellStatuses[i], (status) => setCellStatus(i, status));
            console.log('Execute result:', result);
        } else {
            // If the cell is a markdown cell, mark it as executed
            setCellExecutedStatus(i, true);
            cell.isExecuted = true;
        }
    }
  };

}

export default NotebookModel;