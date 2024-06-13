

class Directory {
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
  
}

export default Directory;