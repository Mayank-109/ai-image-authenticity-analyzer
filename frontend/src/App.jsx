import { useState } from "react"
import "./App.css"

function App(){
  const [file,setfile] = useState(null) 
  const [result,setresult] = useState(null)
  const [loading, setloading] = useState(null)
  const [history, sethistory] = useState([])


   const analyzeImage = async () => { 

    setloading(true)

    if(!file){
      alert("Please select a file");
      return;
    }

    const formdata = new FormData();
    formdata.append("file", file);

    const response = await
      fetch("http://127.0.0.1:8000/upload",{
        method: "POST",
        body: formdata,
      });
      
      const data = await response.json();
      setresult(data);
      setloading(false)

  }
  
   const loadhistory = async () => {
      const response = await
      fetch("http://127.0.0.1:8000/history")
      const data = await response.json()
      sethistory(data.records)
    }
  
  ;


  





return (
  <div className="container">
    <div className="card">

      <div className="logo">✨</div>

      <h1>AI Image Authenticity Analyzer</h1>

      <p className="subtitle">
        Detect AI-generated and manipulated images instantly.
      </p>

      <input
        className="upload-section"
        type="file"
        onChange={(e) => {
          setfile(e.target.files[0]);
          setresult(null);
        }}
      />

      {file && (
        <div className="result-container">

          {/* LEFT SIDE */}
          <div className="image-section">
            <img
              src={URL.createObjectURL(file)}
              alt="preview"
              className="preview-image"
            />
          </div>

          {/* RIGHT SIDE */}
          <div className="analysis-section">

            <div className="image-info">
              <h2 id="imgh">Image Information</h2>

              <p className="filename">
                {file.name}
              </p>

              <p>
                {Math.round(file.size / 1024)} KB
              </p>
            </div>

            <p>
              Resolution:
              {result?.img_info?.width}  X {result?.img_info?.height}
            </p>

            <p>
              Format:
              {result?.img_info?.format}
            </p>

            {result && (
              <div className="result-card">

                <h2 className="header">Analysis Result</h2>

               <p><strong>Trust Score:</strong></p>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${result.trust_score}%` }}
                ></div>
              </div>

                <p>{result.trust_score}%</p>

                <p>
                <strong>Risk:</strong>

                 <span
                    className={
                    result.risk === "low"
                     ? "risk-low"
                      : result.risk === "medium"
                        ? "risk-medium"
                          : "risk-high"
                    }
                  >
                  {result.risk}
                 </span>
                </p>


                <p><strong>AI Probability:</strong></p>

                  <div className="progress-bar">
                  <div
                      className="progress-fill ai-fill"
                      style={{ width: `${result.ai_detection.ai_prob}%` }}
                  ></div>
                  </div>

                <p>{result.ai_detection.ai_prob}%</p>

                <p>
                  <strong>Label:</strong>{" "}
                  {result.ai_detection.label}
                </p>

                <h3>Why?</h3>

               {result.reasons.map((reason, index) => (
               <p key={index}>• {reason}</p>
               ))}

              </div>
            )}

          </div>

        </div>
      )}

      <button
        className="analyze-btn"
        onClick={analyzeImage}
      >
        Analyze Image
      </button>

      <button
        className="history-btn"
        onClick={loadhistory}
      >
        View History
      </button>

      {loading && (
        <div className="spinner"></div>
      )}

      {history.map((item, index) => (
        <div key={index}>
          <p>{item.filename}</p>
          <p>{item.trust_score}</p>
          <hr />
        </div>
      ))}

    </div>
  </div>
);
}

export default App;