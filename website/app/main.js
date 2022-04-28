/**
 * processSpeech(transcript)
 *  Is called anytime speech is recognized by the Web Speech API
 *  Input:
 *    transcript, a string of possibly multiple words that were recognized
 *  Output:
 *    processed, a boolean indicating whether the system reacted to the speech or not
 */

var processSpeech = function(transcript) {
  // Helper function to detect if any commands appear in a string
  transcript = transcript.toLowerCase();
  var userSaid = function(str, commands) {
    for (var i = 0; i < commands.length; i++) {
      if (str.indexOf(commands[i]) > -1)
        return true;
    }
    return false;
  };
  if (userSaid(transcript, ['masterclass play'])) {
    player.playVideo()
  }
  else if (userSaid(transcript, ['masterclass stop', 'masterclass pause'])) {
    player.pauseVideo()
  }
  else if (userSaid(transcript, ['masterclass restart'])) {
    player.seekTo(Number('0'), true)
  }
  else if (userSaid(transcript, ['masterclass skip', 'masterclass forward'])) {
    player.seekTo(player.getCurrentTime()+10, true)
  }
  else if (userSaid(transcript, ['masterclass rewind', 'masterclass backwards'])) {
    player.seekTo(player.getCurrentTime()-10, true)
  }
  else if (userSaid(transcript, ['masterclass volume up', 'masterclass louder'])) {
    var volume = player.getVolume() + 10;
    player.setVolume(Math.max(Math.min(volume, 100), 0));
  }
  else if (userSaid(transcript, ['masterclass volume down', 'masterclass quieter'])) {
    var volume = player.getVolume() - 10;
    player.setVolume(Math.max(Math.min(volume, 100), 0));
  }
  else if (userSaid(transcript, ['masterclass mute', 'masterclass volume off'])) {
    player.mute();
  }
  else if (userSaid(transcript, ['masterclass unmute', 'masterclass volume on'])) {
    player.unMute();
  }
  else if (userSaid(transcript, ['masterclass speed up', 'masterclass increase speed'])) {
    increaseSpeed();
  }
  else if (userSaid(transcript, ['masterclass slow down', 'masterclass decrease speed'])) {
    decreaseSpeed()
  }
};

// const drawHand = (predictions, ctx) => {
//   // Check if we have predictions
//   if (predictions.length > 0) {
//     // Loop through each prediction
//     predictions.forEach((prediction) => {
//       // Grab landmarks
//       const landmarks = prediction.landmarks;
//       console.log(landmarks)
//       // Loop through fingers
//       for (let j = 0; j < Object.keys(fingerJoints).length; j++) {
//         let finger = Object.keys(fingerJoints)[j];
//         //  Loop through pairs of joints
//         for (let k = 0; k < fingerJoints[finger].length - 1; k++) {
//           // Get pairs of joints
//           const firstJointIndex = fingerJoints[finger][k];
//           const secondJointIndex = fingerJoints[finger][k + 1];

//           // Draw path
//           ctx.beginPath();
//           ctx.moveTo(
//               landmarks[firstJointIndex][0]/2,
//               landmarks[firstJointIndex][1]/2,
//           );
//           ctx.lineTo(
//               landmarks[secondJointIndex][0]/2,
//               landmarks[secondJointIndex][1]/2
//           );
//           ctx.strokeStyle = "plum";
//           ctx.lineWidth = 2;
//           ctx.stroke();
//         }
//       }

//       // Loop through landmarks and draw em
//       for (let i = 0; i < landmarks.length; i++) {
//         // Get x point
//         const x = landmarks[i][0]/2;
//         // Get y point
//         const y = landmarks[i][1]/2;
//         // Start drawing
//         ctx.beginPath();
//         ctx.arc(x, y, style[i]["size"], 0, 3 * Math.PI);
//         // Set line color
//         ctx.fillStyle = style[i]["color"];
//         ctx.fill();
//       }
//     });
//   }
// };

// /////////////////////////////////////////////////////////////////////
// (function() {
//   var canvas = document.getElementById('canvas');
//   var context = canvas.getContext('2d');
//   var video = document.getElementById('videoElement');
//   /////////////////////////////////////////////////////////////////
//   if (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia) {
//     navigator.mediaDevices.getUserMedia({ video: true,
//       audio:false })
//         .then(function (stream) {
//           video.srcObject = stream;
//         })
//         .catch(function (err) {
//           console.log("Something went wrong!");
//         });
//   }
//   ///////////////////////////////////////////////////////////////
//   video.addEventListener('play',function()
//   {
//     draw(this, context,320,240);
//   },false);
//   ///////////////////////////////////////////////////////////////

//   let lastGesture = "";
//   async function draw(video,context, width, height){
//     context.drawImage(video,0,0,width,height);
//     const model = await handpose.load();

//     const predictions = await model.estimateHands(video);
//     document.getElementById("speedDebug").innerHTML = "SPEED DEBUG: " +  player.getPlaybackRate();
//     var date = new Date(0);
//     date.setSeconds(player.getCurrentTime()); // specify value for SECONDS here
//     var timeString = date.toISOString().substr(11, 8);
//     document.getElementById("videoPositionDebug").innerHTML = "Video Position Debug: " + timeString;
//     document.getElementById("volumeDebug").innerHTML = "VOLUME DEBUG: " + player.getVolume();
  
//     // console.log(predictions);
//     ///////////////////////////////////////////////////////////
//     if (predictions.length > 0){
//       for (let i = 0; i < predictions.length; i++) {
//         drawHand(predictions,context);

//         var probability = predictions[i].handInViewConfidence;
//         var prob = (probability*100).toPrecision(5).toString();
//         var text = "Confidence:"+prob+"%";
//         context.font = "16pt Comic Sans MS";
//         context.fillStyle = "#FF0000";
//         context.fillText(text,425,20);
//         const GE = new fp.GestureEstimator([
//           // fp.Gestures.VictoryGesture,
//           PointDownGesture,
//           FistGesture,
//           OpenPalmGesture,
//           PointLeftGesture,
//           PointRightGesture,
//           PointUpGesture,
//         ]);
//         const gesture = await GE.estimate(predictions[0].landmarks, 8);
//         console.log('gesture', gesture);
//         if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
//           const maxConfidenceGesture = gesture.gestures.reduce((p, c) => { 
//             return (p.confidence > c.confidence) ? p : c;
//           });
//           console.log(maxConfidenceGesture.name)
//           document.getElementById("gestureDebug").innerHTML = "GESTURE DEBUG: " + maxConfidenceGesture.name;
//           if (maxConfidenceGesture.name == 'open_palm') {
//             player.playVideo();
//           }
//           else if (maxConfidenceGesture.name == 'fist') {
//             player.pauseVideo();
//           }
//           else if (maxConfidenceGesture.name == 'point_left') {
//             skip(-10);
//           }
//           else if (maxConfidenceGesture.name == 'point_right') {
//             skip(10);
//           }
//           else if (maxConfidenceGesture.name == 'point_up'){
//             var volume = player.getVolume() + 10;
//             player.setVolume(Math.max(Math.min(volume, 100), 0));
//           }
//           else if (maxConfidenceGesture.name == 'point_down'){
//             var volume = player.getVolume() - 10;
//             player.setVolume(Math.max(Math.min(volume, 100), 0));
//           }
//           // if(gesture == lastGesture) {
//           //   console.log("Returned ", gesture.gestures)
//           // }
//           // lastGesture = gesture;

//         }
//       }
//       //////////////////////////////////////////////////////
//     }
//     setTimeout(draw,100,video,context,width,height);
//     /////////////////////////////////////////////////////////
//   }
// })();


