import config from '../config';

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

  static async getChildren(path = '') {
    const response = await fetch(`${config.serverBaseUrl}/directory/` + path);
    if (!response.ok) {
        throw new Error('Failed to fetch files');
    } else {
        const data = await response.json();
        return data.content;
    }
  }

  static async getSubDirectories(path = '') {
    const items = await this.getChildren(path);
    const promises = items.map(async (item) => {
      if (item.type === 'directory') {
        item.children = await this.getSubDirectories(`${path}/${item.name}`);
      }
      return item;
    });
    return Promise.all(promises);
  }
  
  static async createDirectory(path = '', directoryName = '') {
    console.log("Creating directory at path:", path + '/' + directoryName);
    const response = await fetch(`${config.serverBaseUrl}/directory`, {
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
    const response = await fetch(`${config.serverBaseUrl}/directory/` + oldPath, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newPath: newPath
        }),
      });
  }

  static async deleteDirectory(item = '') {
    const itemPath = item.path;
    
    let folderItems = [];
    await DirectoryModel.getChildren(itemPath)
        .then((data) => {
            folderItems = data;
        })
    if (folderItems.length > 0) {
        alert('Directory is not empty');
    } else {
        console.log("Deleting item at path:", itemPath);
        try {
            const response = await fetch(`${config.serverBaseUrl}/directory/` + itemPath, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete directory');
            }
        } catch (error) {
            alert(`Failed to delete directory: ${error.message}`);
        }
    }
  }
  
}

export default DirectoryModel;