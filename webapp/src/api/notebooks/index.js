export const fetchFiles = async (path = '') => {
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
};

export const fetchNotebook = async (path = '') => {
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

export const createNotebook = async (path = '') => {
    const timestamp = Date.now();
    const notebookName = `notebook-${timestamp}.ipynb`;
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

export const deleteNotebook = async (path = '') => {
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

export const updateNotebook = async (path = '', content = {}) => {
  console.log("Updating notebook at path:", path);
  const response = await fetch(path, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: content,
            type: 'notebook'
        })
    });

    if (!response.ok) {
        throw new Error('Failed to update notebook');
    }
    const data = await response.json();
    return data;
};

