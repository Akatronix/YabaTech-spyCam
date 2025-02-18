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




const socket = io.connect(window.location.origin);

let myStream;
let peer = null; // Ensure peer is properly managed
const myVideo = document.getElementById("myVideo");
const remoteVideo = document.getElementById("remoteVideo");
const videoUnavailableDiv = document.getElementById("videoUnavailable"); // The div to show if no video

// Function to show/hide the fallback div
function toggleVideoFallback(show) {
  videoUnavailableDiv.style.display = show ? "block" : "none";
  remoteVideo.style.display = show ? "none" : "block";
}

navigator.mediaDevices
  .getUserMedia({ video: true, audio: true })
  .then((stream) => {
    myStream = stream;
    myVideo.srcObject = stream;
    myVideo.muted = true;

    socket.emit("joinRoom");

    socket.on("userConnected", (otherUserId) => {
      console.log("New user connected:", otherUserId);

      if (!peer) {
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
          toggleVideoFallback(false); // Hide fallback when video is available
        });

        peer.on("error", (err) => console.error("Peer Error:", err));
      }
    });

    socket.on("offerReceived", ({ from, signal }) => {
      console.log("Offer received from:", from);

      if (!peer) {
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
          toggleVideoFallback(false); // Hide fallback when video is available
        });

        peer.on("error", (err) => console.error("Peer Error:", err));
      }

      peer.signal(signal); // Ensure signal is processed once
    });

    socket.on("answerReceived", (signal) => {
      console.log("Answer received, completing connection");

      if (peer) {
        try {
          peer.signal(signal);
        } catch (err) {
          console.error("Error processing answer:", err);
        }
      }
    });

    // Initially show fallback
    toggleVideoFallback(true);
  })
  .catch((error) => {
    console.error("Error accessing media devices:", error);
    toggleVideoFallback(true);
  });

