// import React, { useRef, useState } from "react";
// import Webcam from "react-webcam";
// import "./App.css";

// function App() {
//   const webcamRef = useRef(null);
//   const [screenshot, setScreenshot] = useState(null);

//   const videoConstraints = {
//     width: 640,
//     height: 480,
//     facingMode: "user",
//   };

//   const captureImage = () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     setScreenshot(imageSrc);
//     console.log("Screenshot captured");
//     // In Phase 2: Send imageSrc to backend via POST request
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h2>📸 Online Exam Proctor</h2>

//         <Webcam
//           audio={false}
//           ref={webcamRef}
//           screenshotFormat="image/jpeg"
//           width={640}
//           height={480}
//           videoConstraints={videoConstraints}
//         />

//         <button onClick={captureImage} style={{ marginTop: "15px" }}>
//           📷 Capture Image
//         </button>

//         {screenshot && (
//           <div style={{ marginTop: "20px" }}>
//             <h4>🖼️ Captured Image:</h4>
//             <img src={screenshot} alt="Captured" style={{ width: "320px", borderRadius: "10px" }} />
//           </div>
//         )}
//       </header>
//     </div>
//   );
// }

// export default App;








// import React, { useRef, useState } from "react";
// import Webcam from "react-webcam";
// import "./App.css";

// function App() {
//   const webcamRef = useRef(null);
//   const [screenshot, setScreenshot] = useState(null);
//   const [result, setResult] = useState(null);

//   const videoConstraints = {
//     width: 640,
//     height: 480,
//     facingMode: "user",
//   };

//   const captureImage = async () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     setScreenshot(imageSrc);
//     console.log("📸 Screenshot captured");

//     try {
//       const blob = await fetch(imageSrc).then((res) => res.blob());
//       const formData = new FormData();
//       formData.append("image", blob, "screenshot.jpg");

//       const response = await fetch("/detect", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();
//       console.log("✅ Detection result:", data);
//       setResult(data);
//     } catch (error) {
//       console.error("❌ Error sending image to backend:", error);
//     }
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h2>📸 Online Exam Proctor</h2>

//         <Webcam
//           audio={false}
//           ref={webcamRef}
//           screenshotFormat="image/jpeg"
//           width={640}
//           height={480}
//           videoConstraints={videoConstraints}
//         />

//         <button onClick={captureImage} style={{ marginTop: "15px" }}>
//           📷 Capture Image
//         </button>

//         {screenshot && (
//           <div style={{ marginTop: "20px" }}>
//             <h4>🖼️ Captured Image:</h4>
//             <img
//               src={screenshot}
//               alt="Captured"
//               style={{ width: "320px", borderRadius: "10px" }}
//             />
//           </div>
//         )}

//         {result && (
//           <div style={{ marginTop: "30px", textAlign: "left", width: "90%" }}>
//             <h4>📊 Detection Results:</h4>
//             <p>🧑‍🤝‍🧑 Face Count: <strong>{result.face_count}</strong></p>
//             <p>📱 Mobile Detected: <strong>{result.mobile_detected ? "Yes" : "No"}</strong></p>
//             <p>🚨 Cheating Detected: <strong>{result.cheating_detected ? "Yes" : "No"}</strong></p>

//             {result.annotated_image_url && (
//               <div style={{ marginTop: "15px" }}>
//                 <h4>🖍️ Annotated Image:</h4>
//                 <img
//                   src={result.annotated_image_url}
//                   alt="Annotated"
//                   style={{ width: "320px", borderRadius: "10px", border: "2px solid #ccc" }}
//                 />
//               </div>
//             )}
//           </div>
//         )}
//       </header>
//     </div>
//   );
// }

// export default App;












import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import VideoProctor from "./VideoProctor"; // Importing video proctoring component
import "./App.css";

function App() {
  const webcamRef = useRef(null);
  const [screenshot, setScreenshot] = useState(null);
  const [result, setResult] = useState(null);
  const [startProctoring, setStartProctoring] = useState(false);

  const videoConstraints = {
    width: 640,
    height: 480,
    facingMode: "user",
  };

  const captureImage = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setScreenshot(imageSrc);
    console.log("📸 Screenshot captured");

    try {
      const blob = await fetch(imageSrc).then((res) => res.blob());
      const formData = new FormData();
      formData.append("image", blob, "screenshot.jpg");

      const response = await fetch("/detect", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("✅ Detection result:", data);
      setResult(data);
    } catch (error) {
      console.error("❌ Error sending image to backend:", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>🧠 Smart Classroom Exam Proctor</h2>

        {!startProctoring ? (
          <>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={640}
              height={480}
              videoConstraints={videoConstraints}
            />

            <button onClick={captureImage} style={{ marginTop: "15px" }}>
              📷 Capture Image
            </button>

            <button
              onClick={() => setStartProctoring(true)}
              style={{ marginTop: "10px", backgroundColor: "#28a745", color: "white" }}
            >
              🎥 Start Video Proctoring
            </button>
          </>
        ) : (
          <>
          <VideoProctor />
          <button
            onClick={() => setStartProctoring(false)}
            style={{ marginTop: "15px", backgroundColor: "#dc3545", color: "white" }}
          >
            ⏹️ Stop Video Proctoring
          </button>
        </>
        )}

      {screenshot && (
        <div style={{ marginTop: "20px" }}>
          <h4>🖼️ Captured Image:</h4>
          <img
            src={screenshot}
            alt="Captured"
            style={{ width: "320px", borderRadius: "10px" }}
          />
        </div>
      )}

      {result && (
        <div style={{ marginTop: "30px", textAlign: "left", width: "90%" }}>
          <h4>📊 Detection Results:</h4>
          <p>🧑‍🤝‍🧑 Face Count: <strong>{result.face_count}</strong></p>
          <p>📱 Mobile Detected: <strong>{result.mobile_detected ? "Yes" : "No"}</strong></p>
          <p>🚨 Cheating Detected: <strong>{result.cheating_detected ? "Yes" : "No"}</strong></p>

          {result.annotated_image_url && (
            <div style={{ marginTop: "15px" }}>
              <h4>🖍️ Annotated Image:</h4>
              <img
                src={result.annotated_image_url}
                alt="Annotated"
                style={{
                  width: "320px",
                  borderRadius: "10px",
                  border: "2px solid #ccc",
                }}
              />
            </div>
          )}
        </div>
      )}
    </header>
    </div >
  );
}

export default App;






