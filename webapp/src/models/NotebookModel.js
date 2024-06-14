class NotebookModel {
  constructor() {
  }

  static async fetchNotebook(path = '') {
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

  static async createNotebook(path = '', notebookName='') {
    if (notebookName === '') {
        const timestamp = Date.now();
        notebookName = `notebook-${timestamp}.ipynb`;
    } else {
        notebookName = `${notebookName}.ipynb`;
    }
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
  
  static async updateNotebook(path = '', content = {}) {
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

  static async deleteNotebook(path = '') {
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

  static async renameNotebook(basePath = '', path = '', newName = '') {
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

}

export default NotebookModel;