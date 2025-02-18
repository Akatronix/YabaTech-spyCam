// const socket = io.connect(window.location.origin);

// let myStream;
// let peer;
// const myVideo = document.getElementById("myVideo");
// const remoteVideo = document.getElementById("remoteVideo");
// let mediaRecorder;
// let recordedChunks = [];

// navigator.mediaDevices
//   .getUserMedia({ video: true, audio: true })
//   .then((stream) => {
//     myStream = stream;
//     myVideo.srcObject = stream;
//     myVideo.muted = true;

//     socket.emit("joinRoom");
//     socket.on("userConnected", (otherUserId) => {
//       console.log("New user connected:", otherUserId);

//       peer = new SimplePeer({
//         initiator: true,
//         trickle: false,
//         stream: myStream,
//       });

//       peer.on("signal", (data) => {
//         socket.emit("sendOffer", { target: otherUserId, signalData: data });
//       });

//       peer.on("stream", (userStream) => {
//         remoteVideo.srcObject = userStream;
//       });

//       peer.on("error", (err) => console.error("Peer Error:", err));
//     });

//     socket.on("offerReceived", ({ from, signal }) => {
//       console.log("Offer received from:", from);
//       peer = new SimplePeer({
//         initiator: false,
//         trickle: false,
//         stream: myStream,
//       });

//       peer.on("signal", (data) => {
//         socket.emit("sendAnswer", { target: from, signalData: data });
//       });

//       peer.on("stream", (userStream) => {
//         remoteVideo.srcObject = userStream;

//       });

//       peer.on("error", (err) => console.error("Peer Error:", err));
//       peer.signal(signal);
//     });

//     socket.on("answerReceived", (signal) => {
//       console.log("Answer received, completing connection");
//       peer.signal(signal);
//     });
//   })
//   .catch((error) => {
//     console.error("Error accessing media devices:", error);
//   });

// const socket = io.connect(window.location.origin);

// let myStream;
// let peer;
// const myVideo = document.getElementById("myVideo");
// const remoteVideo = document.getElementById("remoteVideo");
// const videoUnavailableDiv = document.getElementById("videoUnavailable"); // The div to show if no video
// let mediaRecorder;
// let recordedChunks = [];

// // Function to show/hide the fallback div
// function toggleVideoFallback(show) {
//   videoUnavailableDiv.style.display = show ? "block" : "none";
//   remoteVideo.style.display = show ? "none" : "block";
// }

// navigator.mediaDevices
//   .getUserMedia({ video: true, audio: true })
//   .then((stream) => {
//     myStream = stream;
//     myVideo.srcObject = stream;
//     myVideo.muted = true;

//     socket.emit("joinRoom");

//     socket.on("userConnected", (otherUserId) => {
//       console.log("New user connected:", otherUserId);

//       peer = new SimplePeer({
//         initiator: true,
//         trickle: false,
//         stream: myStream,
//       });

//       peer.on("signal", (data) => {
//         socket.emit("sendOffer", { target: otherUserId, signalData: data });
//       });

//       peer.on("stream", (userStream) => {
//         remoteVideo.srcObject = userStream;
//         toggleVideoFallback(false); // Hide the fallback when video is available
//       });

//       peer.on("error", (err) => console.error("Peer Error:", err));
//     });

//     socket.on("offerReceived", ({ from, signal }) => {
//       console.log("Offer received from:", from);
//       peer = new SimplePeer({
//         initiator: false,
//         trickle: false,
//         stream: myStream,
//       });

//       peer.on("signal", (data) => {
//         socket.emit("sendAnswer", { target: from, signalData: data });
//       });

//       peer.on("stream", (userStream) => {
//         remoteVideo.srcObject = userStream;
//         toggleVideoFallback(false); // Hide the fallback when video is available
//       });

//       peer.on("error", (err) => console.error("Peer Error:", err));
//       peer.signal(signal);
//     });

//     socket.on("answerReceived", (signal) => {
//       console.log("Answer received, completing connection");
//       peer.signal(signal);
//     });

//     // Initially, assume no remote video and show the fallback
//     toggleVideoFallback(true);
//   })
//   .catch((error) => {
//     console.error("Error accessing media devices:", error);
//     toggleVideoFallback(true);
//   });




// const socket = io.connect(window.location.origin);

// let myStream;
// let peer = null; // Ensure peer is properly managed
// const myVideo = document.getElementById("myVideo");
// const remoteVideo = document.getElementById("remoteVideo");
// const videoUnavailableDiv = document.getElementById("videoUnavailable");

// // Function to show/hide the fallback div
// function toggleVideoFallback(show) {
//   videoUnavailableDiv.style.display = show ? "block" : "none";
//   remoteVideo.style.display = show ? "none" : "block";
// }

// navigator.mediaDevices
//   .getUserMedia({ video: true, audio: true })
//   .then((stream) => {
//     myStream = stream;
//     myVideo.srcObject = stream;
//     myVideo.muted = true;

//     socket.emit("joinRoom");

//     socket.on("userConnected", (otherUserId) => {
//       console.log("New user connected:", otherUserId);

//       if (!peer) {
//         peer = new SimplePeer({
//           initiator: true,
//           trickle: false,
//           stream: myStream,
//         });

//         peer.on("signal", (data) => {
//           socket.emit("sendOffer", { target: otherUserId, signalData: data });
//         });

//         peer.on("stream", (userStream) => {
//           remoteVideo.srcObject = userStream;
//           toggleVideoFallback(false); // Hide fallback when video is available
//         });

//         peer.on("error", (err) => console.error("Peer Error:", err));
//       }
//     });

//     socket.on("offerReceived", ({ from, signal }) => {
//       console.log("Offer received from:", from);

//       if (!peer) {
//         peer = new SimplePeer({
//           initiator: false,
//           trickle: false,
//           stream: myStream,
//         });

//         peer.on("signal", (data) => {
//           socket.emit("sendAnswer", { target: from, signalData: data });
//         });

//         peer.on("stream", (userStream) => {
//           remoteVideo.srcObject = userStream;
//           toggleVideoFallback(false); // Hide fallback when video is available
//         });

//         peer.on("error", (err) => console.error("Peer Error:", err));
//       }

//       try {
//         if (!peer.destroyed) {
//           peer.signal(signal); // Apply signal only when peer is valid
//         }
//       } catch (err) {
//         console.error("Error processing offer:", err);
//       }
//     });

//     socket.on("answerReceived", (signal) => {
//       console.log("Answer received, completing connection");

//       if (peer && !peer.destroyed) {
//         try {
//           peer.signal(signal);
//         } catch (err) {
//           console.error("Error processing answer:", err);
//         }
//       }
//     });

//     // Initially show fallback
//     toggleVideoFallback(true);
//   })
//   .catch((error) => {
//     console.error("Error accessing media devices:", error);
//     toggleVideoFallback(true);
//   });



const socket = io.connect(window.location.origin);

let myStream;
let peer;
const myVideo = document.getElementById("myVideo");
const remoteVideo = document.getElementById("remoteVideo");
let mediaRecorder;
let recordedChunks = [];

// Get user media (video & audio)
navigator.mediaDevices
  .getUserMedia({ video: true, audio: true })
  .then((stream) => {
    myStream = stream;
    myVideo.srcObject = stream;
    myVideo.muted = true; // Prevent self-audio loop

    socket.emit("joinRoom"); // Notify server that user joined

    socket.on("userConnected", (otherUserId) => {
      console.log("New user connected:", otherUserId);

      // Create a peer connection (initiator = true means this user is calling)
      peer = new SimplePeer({
        initiator: true,
        trickle: false,
        stream: myStream,
      });

      peer.on("signal", (data) => {
        socket.emit("sendOffer", { target: otherUserId, signalData: data });
      });

      peer.on("stream", (userStream) => {
        remoteVideo.srcObject = userStream;
      });

      peer.on("error", (err) => console.error("Peer Error:", err));
    });

    socket.on("offerReceived", ({ from, signal }) => {
      console.log("Offer received from:", from);

      // Create a peer connection (initiator = false means this user is answering)
      peer = new SimplePeer({
        initiator: false,
        trickle: false,
        stream: myStream,
      });

      peer.on("signal", (data) => {
        socket.emit("sendAnswer", { target: from, signalData: data });
      });

      peer.on("stream", (userStream) => {
        remoteVideo.srcObject = userStream;
      });

      peer.on("error", (err) => console.error("Peer Error:", err));

      // Accept incoming WebRTC signal
      peer.signal(signal);
    });

    socket.on("answerReceived", (signal) => {
      console.log("Answer received, completing connection");
      peer.signal(signal);
    });
  })
  .catch((error) => {
    console.error("Error accessing media devices:", error);
  });

// Function to start recording both local & remote streams
function startRecording(localStream, remoteStream) {
  recordedChunks = [];

  // Create a new MediaStream to merge both streams
  let combinedStream = new MediaStream();

  // Add local and remote video tracks to the combined stream
  if (localStream && localStream.getTracks().length > 0) {
    localStream.getTracks().forEach((track) => combinedStream.addTrack(track));
  }

  if (remoteStream && remoteStream.getTracks().length > 0) {
    remoteStream.getTracks().forEach((track) => combinedStream.addTrack(track));
  }

  // Initialize MediaRecorder with the combined stream
  mediaRecorder = new MediaRecorder(combinedStream);

  // Store video data when available
  mediaRecorder.ondataavailable = (event) => {
    if (event.data.size > 0) {
      recordedChunks.push(event.data);
    }
  };

  mediaRecorder.onstop = saveRecording;
  mediaRecorder.start();
  console.log("Recording started...");
}

// Stop Recording
function stopRecording() {
  if (mediaRecorder && mediaRecorder.state !== "inactive") {
    mediaRecorder.stop();
    console.log("Recording stopped...");
  }
}

// Save Recording to File
function saveRecording() {
  const blob = new Blob(recordedChunks, { type: "video/webm" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "webrtc-recording.webm";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// Get Video Streams and Start Recording
document.getElementById("startRecording").addEventListener("click", () => {
  if (myStream && remoteVideo.srcObject) {
    startRecording(myStream, remoteVideo.srcObject); // Use streams directly
  } else {
    alert("No video streams available!");
  }
});

// Stop Recording Button
document.getElementById("stopRecording").addEventListener("click", () => {
  stopRecording();
});
