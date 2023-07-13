import { useEffect, useState } from 'react';

function Home() {
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch('/api')
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  return (
    <div>
      {typeof backendData[0].name === 'undefined' ? (
        <p>Loading...</p>
      ) : (
        backendData.map((student, i) => <p key={i}>{student.name}</p>)
      )}
    </div>
  );
}
export default Home;
