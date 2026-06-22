import { useState } from "react"
import "./App.css"

function App(){
  // const [count, setCount] = useState(0);
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


  

  return(
    
    <div>
     <div className="container">
    <div className="card">
      <div className="logo">✨</div>
      <h1>AI Image Authenticity Analyzer</h1>
      
<p className="subtitle">
  Detect AI-generated and manipulated images instantly.
</p>

      


      <input className="upload-section" type="file" onChange={(e)=>{ setfile(e.target.files[0])
        setresult(null)
      }}
      />
      
      {file && (
        <div>
          <div className="file-info">
          <p>{file.name}</p>
          <p>{Math.round(file.size/1024)} KB</p>
        </div>

          <img src={URL.createObjectURL(file)}
          alt = "preview"
          width= "300"
          />
      </div>
      )}

      

      <button
      className="analyze-btn"
       onClick={analyzeImage}
      >
  Analyze Image
</button>
<br />

<button onClick={loadhistory}>View History</button>
</div>
  </div>


      

     

      {loading && (
  <div className="spinner"></div>
)}

      {result && (
  <div className="result-card">

    <h2>Analysis Result</h2>

    <div className="progress">
  <div
    className="progress-fill"
    style={{width:`${result.trust_score}%`}}
  >
  </div>
</div>

    <div className="result-item">
      <span>Risk</span>
      <span>{result.risk}</span>
    </div>

    <div className="result-item">
      <span>AI Probability</span>
      <span>{result.ai_detection.ai_prob}%</span>
    </div>

    <div className="result-item">
      <span>Label</span>
      <span>{result.ai_detection.label}</span>
    </div>

  </div>
)}
    
    
    {history.map((item,index)=>(
      
        <div key={index}>
          <p>{item.filename}</p>
          <p>{item.trust_score}</p>
          <hr/> 
          </div>
      ))}
      

    </div>
  );

 
}

export default App;