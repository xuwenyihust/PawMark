import React, { useState, useEffect } from 'react';
import { Select, MenuItem, Typography, Card, CardHeader, CardContent, TextField, IconButton } from '@mui/material';
import { MdDeleteOutline, MdArrowDropUp, MdArrowDropDown, MdArrowRight } from "react-icons/md";
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-markdown';
import 'ace-builds/src-noconflict/theme-github';
import ReactMarkdown from 'react-markdown';
import Convert from 'ansi-to-html';


function NotebookCell({ cell, index, notebookState, handleChangeCell, handleDeleteCell, handleChangeCellType, handleMoveCell, handleRunCodeCell}) {
    const [isFocused, setIsFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [cellExecuted, setCellExecuted] = useState(false);

    const textEditorLineHeight = 20; // adjust this to match your actual line height
    const textEditorLines = cell.source && typeof cell.source === 'string' ? 
      cell.source.split('\n').length : 1;
    const textEditorHeight = `${Math.max(textEditorLines, 1) * textEditorLineHeight}px`;

    const convert = new Convert();

    useEffect(() => {
      if (cell.cell_type === 'code') {
        setCellExecuted(false);
      } else if (cell.cell_type === 'markdown') {
        setCellExecuted(true);
      }
    }, [cell.source])
    
    const handleDoubleClickMarkdownCell = (cellIndex) => {
      notebookState.content.cells[cellIndex].isExecuted = false;
      setCellExecuted(false);
      console.log('Double clicked markdown cell:', cell.source, cell.isExecuted);
    }

    const handleRunMarkdownCell = (cellIndex) => {
      setCellExecuted(true);
      notebookState.content.cells[cellIndex].isExecuted = true;
    }

    const handleRunCell = (cell, cellIndex) => {
      if (cell.cell_type === 'code') {
        console.log('Running code cell:', cell.source);
        handleRunCodeCell(cell);
      } else {
        handleRunMarkdownCell(cellIndex);
      }
    }

    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}>
          <Card key={index} 
              elevation={0}
              sx={{ 
                  width: '85%',
                  marginTop: 1,
                  marginBottom: 1,
                  marginLeft: 10,
                  marginRight: 1,
                  border: isFocused ? 0.8 : 0.5,
                  borderColor: isFocused ? 'black' : 'lightgrey',
                  backgroundColor: 'rgba(0, 0, 0, 0.03)',
              }}>
              <CardHeader title={
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <IconButton 
                    aria-label="run" 
                    style={{
                      height: 20,
                      width: 40,
                      marginTop: 0,
                      marginBottom: 0,
                      marginLeft: -15, 
                      marginRight: 0 }}>
                    <MdArrowRight onClick={() => handleRunCell(cell, index)}
                      size={40} 
                      style={{ 
                        color: 'grey' }}/>
                  </IconButton>
                  <Select
                    value={cell.cell_type}
                    onChange={(event) => handleChangeCellType(index, event.target.value)}
                    style={{ 
                        fontFamily: 'Arial',
                        fontSize: '13px',
                        color: 'grey',
                        textAlign: 'center',
                        backgroundColor: '#f2f2f2'
                    }}
                    sx={{ bgcolor: '#f2f2f2', height: '22px' }}>
                    <MenuItem value={"markdown"}>Markdown</MenuItem>
                    <MenuItem value={"code"}>Code</MenuItem>
                  </Select>
                </div>}
                sx={{ bgcolor: '#f2f2f2', height: '5px' }}/>
              <CardContent>
                {cell.cell_type === 'code' ? (
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'top' }}>
                    <AceEditor
                      mode="python"
                      theme="github"
                      style={{ 
                          backgroundColor: '#f2f2f2' }}
                      value={cell.source}
                      onChange={newSource => handleChangeCell(newSource, index)}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      name="UNIQUE_ID_OF_DIV"
                      editorProps={{ $blockScrolling: false }}
                      setOptions={{
                        showLineNumbers: false,
                        showPrintMargin: false,
                        showGutter: false,
                        fontSize: 14,
                        highlightActiveLine: false,
                        highlightGutterLine: false,
                      }}
                      width="100%"
                      height={textEditorHeight}
                    />
                  </div>
                ) : ( 
                  cellExecuted ? 
                  <div onDoubleClick={() => handleDoubleClickMarkdownCell(index)}>
                    <ReactMarkdown>
                      {cell.source}
                    </ReactMarkdown>
                  </div> :
                  <AceEditor
                      mode="markdown"
                      theme="github"
                      style={{ 
                          backgroundColor: '#f2f2f2' }}
                      value={cell.source}
                      onChange={newSource => handleChangeCell(newSource, index)}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      name="UNIQUE_ID_OF_DIV"
                      editorProps={{ $blockScrolling: false }}
                      setOptions={{
                        showLineNumbers: false,
                        showPrintMargin: false,
                        showGutter: false,
                        fontSize: 14,
                        highlightActiveLine: false,
                        highlightGutterLine: false,
                      }}
                      width="100%"
                      height={textEditorHeight}
                  />)}
              </CardContent>
          </Card>   

          {(isFocused || isHovered) && (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'top' }}>
              <IconButton aria-label="delete" 
                style={{ 
                  height: 20,
                  marginTop: 10,
                  marginLeft: 0, 
                  marginRight: 0 }}>
                <MdDeleteOutline 
                  onClick={() => handleDeleteCell(index)}
                  size={20} 
                  style={{ 
                    color: 'grey' }}/>
              </IconButton>

              {index !== 0 && 
                <IconButton onClick={() => handleMoveCell(index, index-1)}
                  style={{ marginLeft: 0, marginTop: 2, marginBottom: 2 }}>
                  <MdArrowDropUp
                    size={20}  />
                </IconButton>}
              {index !== notebookState.content.cells.length - 1 && 
                <IconButton onClick={() => handleMoveCell(index, index+1)}
                  style={{ marginLeft: 0, marginTop: 2, marginBottom: 2 }}>
                  <MdArrowDropDown
                    size={20}  />
                </IconButton>}
            </div>
          )}
        </div>      

        {cell.outputs && cell.outputs.length > 0 && cell.outputs.map((output, index) => 
          output.output_type === 'execute_result' ? 
            (
              <Typography 
                variant="body1"
                component="div"
                sx={{
                  color: 'black',
                  width: '85%',
                  fontFamily: 'Arial',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  textAlign: 'left',
                  marginLeft: 10,
                  marginRight: 1,
                  marginTop: 0,
                  marginBottom: 1,
                  marginRight: 1,
                }}>
                <div dangerouslySetInnerHTML={{ __html: output.data['text/html'] }} />
              </Typography>
            ) :
              (output.output_type === 'error' ? (
                <Card 
                  key={index} 
                  elevation={0}
                  sx={{ 
                      width: '85%',
                      marginTop: 0,
                      marginBottom: 1,
                      marginLeft: 10,
                      marginRight: 1,
                      border: isFocused ? 0.5 : 0.2,
                      borderColor: 'red',
                      backgroundColor: 'rgba(255, 0, 0, 0.1)',
                  }}
                >
                  <Typography 
                    variant="body1" 
                    component="div"
                    style={{ 
                      whiteSpace: 'pre-wrap',
                      marginLeft: 10,
                      marginRight: 10,
                      }}>
                    <div dangerouslySetInnerHTML={{ __html: convert.toHtml(output.traceback.join('\n')) }} />
                  </Typography>
                </Card>
              ) : (output.output_type === 'stream' ? (
                <Typography 
                  variant="body1"
                  component="div"
                  sx={{
                    color: 'black',
                    width: '85%',
                    fontFamily: 'Arial',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    textAlign: 'left',
                    marginLeft: 10,
                    marginRight: 1,
                    marginTop: 0,
                    marginBottom: 1,
                    marginRight: 1,
                  }}>
                  {output.text}
                </Typography>
              ) : null)
            )
        )}
      </div>
    )
}

export default NotebookCell;