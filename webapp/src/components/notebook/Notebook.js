import React, { useState, useEffect } from 'react';
import { Button, Tooltip } from '@mui/material';
import NotebookToolbar from './NotebookToolbar';
import Cell from './cell/Cell';
import { CellStatus } from './cell/CellStatus';
import { updateNotebook, renameNotebook, createSession, getSession, runCell, runAllCells, runAllAboveCells } from '../../api';


function Notebook({ 
    jupyterBaseUrl, 
    showNotebook, 
    notebook,
    notebookState,
    setNotebookState,
    isNotebookModified,
    setIsNotebookModified,
    handleDeleteNotebook }) {

    const baseUrl = `${jupyterBaseUrl}/api/contents/`

    const [kernelId, setKernelId] = useState(null);
    const [isNameEditing, setIsNameEditing] = useState(false);
    const [currentName, setCurrentName] = useState(notebook.name);
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
            const notebookContentWithExecutionFlag = notebook.content.cells.map(cell => ({
                ...cell,
                isExecuted: cell.cell_type === 'code' ? false : cell.cell_type === 'markdown' ? true : cell.isExecuted,
              }));
            setNotebookState({
                ...notebook,
                content: {
                    ...notebook.content,
                    cells: notebookContentWithExecutionFlag,
                }
            });
            setCurrentName(notebook.name);
        }
    }, [notebook]);

    const handleClickNotebookName = () => {
        setIsNameEditing(true);
    }

    const handleChangeNotebookName = (event) => {
        setCurrentName(event.target.value);
    }

    const handleSaveNotebookName = () => {
        console.log('Saving notebook name:', currentName);
        setIsNameEditing(false);
        setCurrentName(currentName);
        renameNotebook(baseUrl, notebook.path, currentName).then((data) => {
            console.log('Notebook name saved:', data);
        }).catch((error) => {
            console.error('Failed to save notebook name:', error);
        });
    }

    const handleUpdateNotebook = () => {
        updateNotebook(baseUrl + notebook.path, notebookState.content).then((data) => {
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

    const handleCreateCell = (type = 'code', index) => {
        const newCell = {
            cell_type: type,
            metadata: {},
            source: "",
        };

        if (type === 'code') {
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
        let existingKernelId = await getSession(jupyterBaseUrl, notebook.path);

        if (!existingKernelId) {
            setCellStatus(CellStatus.INITIALIZING);
            newKernelId = await createSession(jupyterBaseUrl, notebook.path);
            setKernelId(newKernelId)
        } else {
            newKernelId = existingKernelId;
        }

        console.log('Kernal ID:', newKernelId);
        try {
            // Call the API to run the cell
            const result = await runCell(jupyterBaseUrl, cell, newKernelId, cellStatus, setCellStatus);

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
        } catch (error) {
            console.error('Failed to execute cell:', error);
        }
    };

    return (
        <div style={{ paddingLeft: 20, paddingRight: 0, marginLeft: 200 }}> {/* Adjust marginLeft based on your sidebar width */}
            {showNotebook && (
                <div>
                    {notebookState.name && 
                        <NotebookToolbar 
                            jupyterBaseUrl={jupyterBaseUrl}
                            notebook={notebookState} 
                            kernelId={kernelId}
                            setKernelId={setKernelId}
                            cellStatuses={cellStatuses}
                            setCellStatus={setCellStatus}
                            cellExecutedStatuses={cellExecutedStatuses}
                            setCellExecutedStatus={setCellExecutedStatus}
                            isNameEditing={isNameEditing}
                            currentName={currentName}
                            isNotebookModified={isNotebookModified}
                            handleClickNotebookName={handleClickNotebookName}
                            handleChangeNotebookName={handleChangeNotebookName}
                            handleSaveNotebookName={handleSaveNotebookName}
                            runAllCells={runAllCells}
                            saveNotebook={handleUpdateNotebook}
                            deleteNotebook={handleDeleteNotebook}/>
                    }
                    {notebookState.content && 
                        notebookState.content.cells && 
                        notebookState.content.cells.map((cell, index) => (
                        <div style={{ position: 'relative' }}>
                            <Cell
                                cell={cell}
                                index={index}
                                notebookState={notebookState}
                                cellStatus={cellStatuses[index]}
                                setCellStatus={status => setCellStatus(index, status)}
                                cellExecutedStatus={cellExecutedStatuses[index]}
                                setCellExecutedStatus={executed => setCellExecutedStatus(index, executed)}
                                handleChangeCell={handleChangeCell}
                                handleDeleteCell={handleDeleteCell} 
                                handleChangeCellType={handleChangeCellType}
                                handleMoveCell={handleMoveCell}
                                handleRunCodeCell={handleRunCodeCell}
                                handleCopyCell={handleCopyCell}
                                handelRunAllAboveCells={
                                    (index) => runAllAboveCells(
                                            index,
                                            jupyterBaseUrl, 
                                            notebookState, 
                                            kernelId, 
                                            setKernelId, 
                                            cellStatuses, 
                                            setCellStatus,
                                            cellExecutedStatuses,
                                            setCellExecutedStatus)}/>
                            <div 
                                style={{ 
                                    display: 'flex',
                                    justifyContent: 'center'}}>
                                <Tooltip title="Add Code Cell" 
                                    sx={{fontSize: 11,
                                    color: "grey"}}>
                                    <Button onClick={() => handleCreateCell('code', index + 1)}>
                                        + Code
                                    </Button>
                                </Tooltip>
                                <Tooltip title="Add Code Cell"
                                    sx={{fontSize: 11,
                                    color: "grey"}}>
                                    <Button onClick={() => handleCreateCell('markdown', index + 1)}>
                                        + Markdown
                                    </Button>
                                </Tooltip>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Notebook;
