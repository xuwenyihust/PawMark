import React from 'react';
import AceEditor from 'react-ace';

const MarkdownEditor = ({
  cell,
  cellIndex,
  textEditorHeight,
  handleChangeCell,
  setIsFocused
}) => {
  return (
    <AceEditor
      mode="markdown"
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
  );
};

export default MarkdownEditor;