import React, { useState, useEffect } from 'react';
import NotebookHeader from './header/NotebookHeader';
import Code from './content/Code';
import Runs from './content/Runs';
import { ContentType } from './content/ContentType';
import { CellStatus } from './content/cell/CellStatus';
import { CellType } from './content/cell/CellType';
import NotebookModel from '../../models/NotebookModel';
import SessionModel from '../../models/SessionModel'
import SparkModel from '../../models/SparkModel';
import config from '../../config';
import { Box } from '@mui/material';


function Notebook({ 
    showNotebook, 
    notebook,
    notebookState,
    setNotebookState,
    isNotebookModified,
    setIsNotebookModified,
    handleDeleteNotebook }) {

    const jupyterBaseUrl= `${config.jupyterBaseUrl}`
    const baseUrl = `${jupyterBaseUrl}/api/contents/`

    const [kernelId, setKernelId] = useState(null);
    const [sparkAppId, setSparkAppId] = useState(null);
    const [isNameEditing, setIsNameEditing] = useState(false);
    const [currentName, setCurrentName] = useState(notebook.name);

    const [contentType, setContentType] = useState(ContentType.CODE)

    // Cells
    const [cellStatuses, setCellStatuses] = useState(notebookState.content ? notebookState.content.cells.map(() => CellStatus.IDLE) : []);
    const [cellExecutedStatuses, setCellExecutedStatuses] = useState(notebookState.content ? notebookState.content.cells.map(cell => cell.cell_type === 'markdown') : []);

    const setCellStatus = (index, status) => {
        setCellStatuses(prevStatuses => {
          const newStatuses = [...prevStatuses];
          newStatuses[index] = status;
          return newStatuses;
        });
    };
    
    const setCellExecutedStatus = (index, executed) => {
        setCellExecutedStatuses(prevStatuses => {
          const newStatuses = [...prevStatuses];
          newStatuses[index] = executed;
          return newStatuses;
        });
    };

    useEffect(() => {
        if (notebook && notebook.content) {
            const notebookContentWithCustomFields = notebook.content.cells.map(cell => ({
                ...cell,
                isExecuted: cell.cell_type === 'code' ? false : cell.cell_type === 'markdown' ? true : cell.isExecuted,
                lastExecutionResult: cell.lastExecutionResult === null? null : cell.lastExecutionResult, 
                lastExecutionTime: cell.lastExecutionTime === null? null : cell.lastExecutionTime
              }));
            setNotebookState({
                ...notebook,
                content: {
                    ...notebook.content,
                    cells: notebookContentWithCustomFields,
                }
            });
            setCurrentName(notebook.name);
        }
        SessionModel.getSession(notebook.path)
            .then((kernelId) => {
                setKernelId(kernelId);
            });
        setSparkAppId(null);
    }, [notebook]);

    const clearOutputs = () => {
        setNotebookState(prevState => {
            const newState = {...prevState};
            newState.content.cells.forEach(cell => {
                if (cell.cell_type === 'code') {
                    cell.outputs = [];
                    cell.lastExecutionResult = null;
                    cell.lastExecutionTime = null;
                }
            });
            return newState;
        });
    }

    const handleClickNotebookName = () => {
        setIsNameEditing(true);
    }

    const handleChangeNotebookName = (event) => {
        setCurrentName(NotebookModel.getNameWithExtension(event.target.value));
    }

    const handleSaveNotebookName = () => {
        console.log('Saving notebook name:', currentName);
        setIsNameEditing(false);
        setCurrentName(currentName);
        setNotebookState(prevState => {
            return {
                ...prevState,
                name: currentName,
                path: 'work/' + currentName,
            }
        });
        NotebookModel.renameNotebook(notebook.path, currentName).then((data) => {
            console.log('Notebook name saved:', data);
        }).catch((error) => {
            console.error('Failed to save notebook name:', error);
        });
    }

    const handleUpdateNotebook = () => {
        NotebookModel.updateNotebook(notebook.path, notebookState.content).then((data) => {
            setIsNotebookModified(false)
        }).catch((error) => {
            console.error('Failed to save notebook:', error);
        });
    }

    const handleChangeCell = (newValue, cellIndex) => {
        setIsNotebookModified(true);
        setNotebookState(prevState => {
            const newState = {...prevState};
            newState.content.cells[cellIndex].source = newValue;
            return newState;
    });}

    const handleCreateCell = (type = CellType.CODE, index) => {
        const newCell = {
            cell_type: type,
            metadata: {},
            source: "",
        };

        if (type === CellType.CODE) {
            newCell.execution_count = null;
            newCell.outputs = [];
        }

        setIsNotebookModified(true);
        setNotebookState(prevState => {
            const cells = [...prevState.content.cells];
            cells.splice(index, 0, newCell);
            return {
                ...prevState,
                content: {
                    ...prevState.content,
                    cells: cells,
                }
            };
        });
    }

    const handleDeleteCell = (cellIndex) => {
        console.log('handleDeleteCell called');
        setNotebookState(prevState => {
            const newState = {...prevState};
            const newCells = [...newState.content.cells];
            newCells.splice(cellIndex, 1);
            console.log('Deleted cell:', cellIndex, newCells);
            newState.content.cells = newCells;
            return newState;
        });
        setIsNotebookModified(true);
    }

    const handleChangeCellType = (cellIndex, newCellType) => {
        setIsNotebookModified(true);
        setNotebookState(prevState => {
            const newState = {...prevState};

            // If the new cell type is a code cell, add an outputs field
            if (newCellType === 'code' && newState.content.cells[cellIndex].cell_type !== 'code') {
                newState.content.cells[cellIndex].outputs = [];
            }
            newState.content.cells[cellIndex].cell_type = newCellType;

            return newState;
        });
    }

    const handleCopyCell = (cellIndex) => {
        console.log('handleCopyCell called');
        const cellToCopy = notebookState.content.cells[cellIndex];
        const newCell = {
            ...cellToCopy,
            source: cellToCopy.source,
            isExecuted: false,
        };

        setNotebookState(prevState => {
            const newState = {...prevState};
            const newCells = [...newState.content.cells];
            newCells.splice(cellIndex + 1, 0, newCell);
            newState.content.cells = newCells;
            return newState;
        });
        setIsNotebookModified(true);
    }

    const handleMoveCell = (fromIndex, toIndex) => {
        if (!notebookState.content.cells || toIndex < 0 || toIndex >= notebookState.content.cells.length) return;

        setIsNotebookModified(true);
        const cellsCopy = [...notebookState.content.cells];
        const cellToMove = cellsCopy.splice(fromIndex, 1)[0];
        cellsCopy.splice(toIndex, 0, cellToMove);

        setNotebookState({
            ...notebookState,
            content: {
                ...notebookState.content,
                cells: cellsCopy
            }
        });
    }

    const handleRunCodeCell = async (cell, cellStatus, setCellStatus) => {
        console.log('Running code cell:', cell);
        let newKernelId = kernelId;
        
        // Assume getSession is a function that returns a kernel ID for a given notebook path
        setCellStatus(CellStatus.INITIALIZING);
        let existingKernelId = await SessionModel.getSession(notebook.path);

        if (!existingKernelId) {
            newKernelId = await SessionModel.createSession(notebook.path);
            setKernelId(newKernelId)
        } else {
            newKernelId = existingKernelId;
        }

        try {
            // Call the API to run the cell
            const result = await NotebookModel.runCell(jupyterBaseUrl, cell, newKernelId, cellStatus, setCellStatus);

            // Check if the result contains a newKernelId
            if (result.newKernelId) {
                // Update the kernelId
                const newKernelId = result.newKernelId;
                setKernelId(newKernelId);
                // Update the result to the result returned by runCell
                result = result.result;
            }
            // And set the cell as executed
            cell.isExecuted = true;
            console.log('Execute result:', result);

            // Check if contains a spark app id
            if (result[0] && result[0].data && result[0].data['text/html'] && SparkModel.isSparkInfo(result[0].data['text/html'])) {
                setSparkAppId(SparkModel.extractSparkAppId(result[0].data['text/html']));
            }
            console.log('Spark app id:', sparkAppId);

        } catch (error) {
            console.error('Failed to execute cell:', error);
        }
    };

    return (
        <div>
            {showNotebook && (
                <Box 
                    style={{ 
                        display: 'flex', 
                        flexDirection: 'column',
                        paddingLeft: 20, 
                        paddingRight: 0, 
                        marginLeft: 200 }}>
                    {notebookState.name && 
                        <NotebookHeader 
                            notebook={notebook}
                            setContentType={setContentType}
                            kernelId={kernelId}
                            sparkAppId={sparkAppId}
                            setSparkAppId={setSparkAppId}
                            isNameEditing={isNameEditing}
                            currentName={currentName}
                            isNotebookModified={isNotebookModified}
                            handleClickNotebookName={handleClickNotebookName}
                            handleChangeNotebookName={handleChangeNotebookName}
                            handleSaveNotebookName={handleSaveNotebookName}
                            clearOutputs={clearOutputs}/>
                    }

                    {
                        notebookState.name && 
                        (contentType === ContentType.CODE ? 
                        <Code
                            notebook={notebook}
                            notebookState={notebookState}
                            cellStatuses={cellStatuses}
                            setCellStatus={setCellStatus}
                            cellExecutedStatuses={cellExecutedStatuses}
                            setCellExecutedStatus={setCellExecutedStatus}
                            handleChangeCell={handleChangeCell}
                            handleDeleteCell={handleDeleteCell}
                            handleChangeCellType={handleChangeCellType}
                            handleMoveCell={handleMoveCell}
                            handleRunCodeCell={handleRunCodeCell}
                            handleCopyCell={handleCopyCell}
                            handleCreateCell={handleCreateCell}
                            kernelId={kernelId}
                            setKernelId={setKernelId}
                            runAllCells={
                                () => NotebookModel.runAllCells(
                                    jupyterBaseUrl, 
                                    notebookState, 
                                    kernelId, 
                                    setKernelId, 
                                    cellStatuses, 
                                    setCellStatus,
                                    cellExecutedStatuses,
                                    setCellExecutedStatus)}
                            saveNotebook={handleUpdateNotebook}
                            deleteNotebook={handleDeleteNotebook}
                            /> : 
                        <Runs />)
                    }
        
                </Box>
            )}
        </div>
    );
}

export default Notebook;
