import { useEffect, useState } from "react";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/history"
      );

      const data = await response.json();

      setHistory(data.records);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Analysis History</h1>

      {history.map((item, index) => (
        <div key={index}>
          <p>Filename: {item.filename}</p>
          <p>Trust Score: {item.trust_score}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default History;