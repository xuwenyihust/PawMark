import { CellStatus } from "../../components/notebook/cell/CellStatus";
import { OutputType } from '../../components/notebook/cell/result/OutputType';
import { CellExecuteResultType } from "../../components/notebook/cell/CellExecuteResultType";
import NotebookModel from "../../models/NotebookModel";
import DirectoryModel from "../../models/DirectoryModel";


export const getSession = async (basePath = '', notebookPath = '') => {
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
    }
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

export const runCell = async (
    basePath, 
    cell, 
    kernelId, 
    cellStatus, 
    setCellStatus) => {
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

        cell.lastExecutionResult = CellExecuteResultType.SUCCESS;
    
        // Wait for the execute_result message
        const result = await new Promise((resolve) => {
          socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            // Only process messages that are in response to this execution
            if (message.parent_header.msg_id === msg_id) {
                console.log('Received message:', message);
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

  export const runAllAboveCells = async (
    index,
    jupyterBaseUrl, 
    notebook, 
    kernelId, 
    setKernelId, 
    cellStatuses, 
    setCellStatus,
    cellExecutedStatuses,
    setCellExecutedStatus
  ) => {
    console.log('notebook:', notebook);
    runAllCells(jupyterBaseUrl, notebook, kernelId, setKernelId, cellStatuses, setCellStatus, cellExecutedStatuses, setCellExecutedStatus, index);
  }

  export const runAllCells = async (
        jupyterBaseUrl, 
        notebook, 
        kernelId, 
        setKernelId, 
        cellStatuses, 
        setCellStatus,
        cellExecutedStatuses,
        setCellExecutedStatus,
        endCellIndex = notebook.content.cells.length
    ) => {
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
                newKernelId = await createSession(jupyterBaseUrl, notebook.path);
                setKernelId(newKernelId);
            }
            // Call the API to run the cell
            const result = await runCell(jupyterBaseUrl, cell, newKernelId, cellStatuses[i], (status) => setCellStatus(i, status));
            console.log('Execute result:', result);
        } else {
            // If the cell is a markdown cell, mark it as executed
            setCellExecutedStatus(i, true);
            cell.isExecuted = true;
        }
    }
  };
