import NotebookModel from "./NotebookModel";

class DirectoryModel {
  constructor(path, files) {
    this.path = path;
    this.files = files;
    console.log('Directory:', this);
  }

  getNotebooks() {
    return this.files.filter(file => file.type === 'notebook');
  }

  getDirectories() {
    return this.files.filter(file => file.type === 'directory');
  }

  isUniqueNotebookName(name) {
    if (name.endsWith('.ipynb')) {
      return this.getNotebooks().every(notebook => notebook.name !== name);
    } else {
      return this.getNotebooks().every(notebook => notebook.name !== (name + '.ipynb'));
    }
  }

  static async getFiles(path = '') {
    console.log("Fetching files at path:", path);
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
  }

  static async createDirectory(basePath = '', directoryPath='') {
    console.log("Creating directory at path:", `${basePath}${directoryPath}`);
    const response = await fetch(`${basePath}${directoryPath}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'directory'
        }),
      });
  }

  static async deleteItem(basePath = '', item = '') {
    const itemPath = basePath + item.path;
    if (item.type === 'notebook') {
        NotebookModel.deleteNotebook(itemPath);
    } else {
        let folderItems = [];
        await DirectoryModel.getFiles(itemPath)
            .then((data) => {
                folderItems = data;
            })
        if (folderItems.length > 0) {
            alert('Directory is not empty');
        } else {
            console.log("Deleting item at path:", itemPath);
            try {
                const response = await fetch(itemPath, {
                    method: 'DELETE'
                });
            } catch (error) {
                alert(`Failed to delete directory: ${error.message}`);
            }
        }
    }
}
  
}

export default DirectoryModel;