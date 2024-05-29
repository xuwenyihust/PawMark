import React, { useState } from 'react';
import { Select, MenuItem, Typography, Card, CardHeader, CardContent, TextField, IconButton } from '@mui/material';
import { MdDeleteOutline, MdArrowDropUp, MdArrowDropDown, MdArrowRight } from "react-icons/md";
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-markdown';
import 'ace-builds/src-noconflict/theme-github';
import ReactMarkdown from 'react-markdown';


function NotebookCell({ cell, index, notebookState, handleChangeCell, handleDeleteCell, handleChangeCellType, handleMoveCell}) {
    const [isFocused, setIsFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const textEditorLineHeight = 20; // adjust this to match your actual line height
    const textEditorLines = cell.source && typeof cell.source === 'string' ? 
      cell.source.split('\n').length : 1;
    const textEditorHeight = `${Math.max(textEditorLines, 1) * textEditorLineHeight}px`;
    
    const handleDoubleClickMarkdownCell = (cellIndex) => {
      notebookState.content.cells[cellIndex].isExecuted = false;
      console.log('Double clicked markdown cell:', cell.source, cell.isExecuted);
    }

    const handleRunMarkdownCell = (cellIndex) => {
      notebookState.content.cells[cellIndex].isExecuted = true;
    }

    const handleRunCell = (cellIndex) => {
      if (cell.cell_type === 'code') {
        console.log('Running code cell:', cell.source);
      } else {
        handleRunMarkdownCell(cellIndex);
      }
    }

    return (
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
                  <MdArrowRight onClick={() => handleRunCell(index)}
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
              ) : ( 
                cell.isExecuted ? 
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
    )
}

export default NotebookCell;