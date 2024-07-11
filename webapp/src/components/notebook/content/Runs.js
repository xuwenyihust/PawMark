import React, { useEffect, useState } from 'react';

function Runs() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5002/notebook/spark_app/work/demo.ipynb')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      {data ? JSON.stringify(data) : 'Loading...'}
    </div>
  );
}

export default Runs;
