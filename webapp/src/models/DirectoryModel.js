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
  isUniqueFolderName(name) {
    return this.getDirectories().every(directory => directory.name !== name);
  }

  static async getFiles(path = '') {
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

  static async getAllItems(path = '') {
    const items = await this.getFiles(path);
    const promises = items.map(async (item) => {
      if (item.type === 'directory') {
        item.children = await this.getAllItems(`${path}/${item.name}`);
      }
      return item;
    });
    return Promise.all(promises);
  }
  
  static async createDirectory(path = '', directoryName = '') {
    console.log("Creating directory at path:", path + '/' + directoryName);
    const response = await fetch("http://localhost:5002/directory", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'directoryPath': path + '/' + directoryName,
        })
    });

    if (!response.ok) {
        throw new Error('Failed to create directory');
    } else {
        const data = await response.json();
        return data;
    }
  }; 

  static async renameDirectory(oldPath='', newPath='') {
    console.log("Renaming item at path:", oldPath, "to", newPath);
    const response = await fetch("http://localhost:5002/directory/" + oldPath, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newPath: newPath
        }),
      });
  }

  static async deleteItem(basePath = '', item = '') {
    const itemPath = basePath + item.path;
    if (item.type === 'notebook') {
        NotebookModel.deleteNotebook(item.path);
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