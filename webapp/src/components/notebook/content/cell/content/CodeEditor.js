import React from 'react';
import AceEditor from 'react-ace';


const CodeEditor = ({ 
    cell, 
    cellIndex,
    textEditorHeight,
    handleChangeCell,
    setIsFocused
   }) => {
    return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'top' }}>
      <AceEditor
        mode="python"
        theme="github"
        style={{ 
            backgroundColor: '#f2f2f2' }}
        value={cell.source}
        onChange={newSource => handleChangeCell(newSource, cellIndex)}
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
    );
  }

export default CodeEditor;