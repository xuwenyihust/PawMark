export const fetchFiles = async (path = '') => {
  const response = await fetch(path, {
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
  const response = await fetch('http://localhost:8888/api/contents/work/demo.ipynb', {
      method: 'GET',
      redirect: "follow"
  });

  const data = await response.json();
  return data;
}

export const createNotebook = async (path = '') => {
  console.log("Creating new notebook at path:", path);
  const notebookData = {
    type: 'notebook',
    content: {
        cells: [],
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

  const response = await fetch(path, {
        method: 'POST',
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
