// import React, { useEffect, useRef, useState } from 'react';

// const VideoProctor = () => {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [cheatingLog, setCheatingLog] = useState([]);

//   useEffect(() => {
//     let stream;

//     // Start webcam
//     navigator.mediaDevices.getUserMedia({ video: true })
//       .then((mediaStream) => {
//         stream = mediaStream;
//         videoRef.current.srcObject = stream;
//       })
//       .catch((err) => console.error("❌ Error accessing webcam:", err));

//     // Send frame every 2 seconds
//     const interval = setInterval(() => {
//       sendFrameToBackend();
//     }, 2000);

//     return () => {
//       clearInterval(interval);
//       if (stream) {
//         stream.getTracks().forEach(track => track.stop());
//       }
//     };
//   }, []);

//   const sendFrameToBackend = () => {
//     const canvas = canvasRef.current;
//     const video = videoRef.current;

//     if (!canvas || !video || video.readyState !== 4) return;

//     const context = canvas.getContext('2d');
//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
//     context.drawImage(video, 0, 0, canvas.width, canvas.height);

//     canvas.toBlob(blob => {
//       if (!blob) return;

//       const formData = new FormData();
//       formData.append('image', blob, 'frame.jpg');

//       fetch('http://localhost:5000/detect-frame', {
//         method: 'POST',
//         body: formData,
//       })
//         .then(res => res.json())
//         .then(data => {
//           console.log('📸 Cheating Result:', data);
//           if (data.cheating_detected) {
//             setCheatingLog(prev => [
//               ...prev,
//               {
//                 time: new Date().toLocaleTimeString(),
//                 face_count: data.face_count,
//                 mobile_detected: data.mobile_detected,
//                 head_direction: data.head_direction,
//               },
//             ]);
//           }
//         })
//         .catch(err => {
//           console.error("❌ Error sending frame:", err);
//         });
//     }, 'image/jpeg');
//   };

//   return (
//     <div>
//       <h3>🎥 Real-Time Proctoring Active</h3>
//       <video ref={videoRef} autoPlay playsInline width={640} height={480} />
//       <canvas ref={canvasRef} style={{ display: 'none' }} />

//       {cheatingLog.length > 0 && (
//         <div style={{ marginTop: "20px", textAlign: "left" }}>
//           <h4>🚨 Cheating Instances</h4>
//           <ul>
//             {cheatingLog.map((log, idx) => (
//               <li key={idx}>
//                 🕒 {log.time} - Faces: {log.face_count}, Phone: {log.mobile_detected ? "Yes" : "No"}, Head: {log.head_direction}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VideoProctor;














import React, { useEffect, useRef, useState } from 'react';

const VideoProctor = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      sendFrameToBackend();
    }, 2000);

    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      videoRef.current.srcObject = stream;
    });

    return () => clearInterval(interval);
  }, []);

  const sendFrameToBackend = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(
      (blob) => {
        const formData = new FormData();
        formData.append("image", blob, "frame.jpg");

        fetch("http://localhost:5000/detect-frame", {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("📡 Cheating result:", data);
          });
      },
      "image/jpeg"
    );
  };

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline width={640} height={480} />
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default VideoProctor; // ✅ THIS LINE IS CRITICAL

