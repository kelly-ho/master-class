// processSpeech(transcript)
//  Is called anytime speech is recognized by the Web Speech API
// Input:
//    transcript, a string of possibly multiple words that were recognized
// Output:
//    processed, a boolean indicating whether the system reacted to the speech or not
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

// From tutorial https://developers.google.com/youtube/iframe_api_reference#Getting_Started
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'M7lc1UVf-VE',
    playerVars: {
      'playsinline': 1
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  // console.log("HELLOOOOO");
  // console.log(document.getElementById("title"));
  // document.getElementById("title").focus();
  // if (event.data == YT.PlayerState.PLAYING && !done) {
  //   setTimeout(stopVideo, 1000);
  //   console.log("STEP 5");
  //   done = true;
  // }
}
function stopVideo() {
  player.stopVideo();
}
function openUrl($this) {
  var videoUrl = $this.previousElementSibling.value;
  $this.previousElementSibling.value = '';
  if(videoUrl == ''){
      console.log('no input');
  }else{
    var videoId = videoUrl.split('?v=').pop().split('&')[0];
    console.log(videoId);
    player.cueVideoById(videoId);
  }
}


/***
 * LEAP PROCESSING
 */
/*
let controllerOptions = {enableGestures: true};
let buffer = 0;

Leap.loop(controllerOptions, function(frame) {
  buffer += 1; //buffer so multiple gestures aren't recognized at once
  console.log(buffer);
  if(frame.gestures.length > 0 && buffer > 200){
    console.log("gesture", frame.gestures.length);
    for(let i=0; frame.gestures.length; i++) {
      if (buffer === 0) { //gesture completed
        break;
      }
      var gesture = frame.gestures[i];
      if (!gesture) {
        continue;
      }
      switch (gesture.type) {
        case "circle":
          console.log("Circle Gesture");
          var pointableID = gesture.pointableIds[0];
          var direction = frame.pointable(pointableID).direction;
          if (!(pointableID && direction)) break;
          var dotProduct = Leap.vec3.dot(direction, gesture.normal);
          var clockwise = (dotProduct > 0);
          if (clockwise) {
            skip(10);
            console.log("clockwise");
          } else {
            skip(-10);
          }
          buffer = 0;
          break;
        case "keyTap":
        case "screenTap":
          console.log("Tap Gesture");
          if (player.getPlayerState() == -1 || player.getPlayerState() == 2) {
            player.playVideo();
          } else if (player.getPlayerState() == 1) {
            player.pauseVideo();
          }
          buffer = 0;
          break;
        case "swipe":
          console.log("Swipe Gesture");
          var xAxis = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
          if (xAxis) {
            console.log("swipe along x axis");
            if (gesture.direction[0] > 0) { //swipe right
              increaseSpeed();
            } else {
              decreaseSpeed();
            }
            buffer = 0;
          }
          break;
        default:
          break;
      }
    }

  }
});
*/
function increaseSpeed() {
  player.setPlaybackRate(player.getPlaybackRate() + 0.25);
}
function decreaseSpeed() {
  player.setPlaybackRate(player.getPlaybackRate() - 0.25);
}



/***
 * SKIP FORWARD AND BACKWARD
 */
function skip(seconds){
  var currentTime = player.getCurrentTime();
  if((seconds > 0 && currentTime>seconds) || seconds < 0){
    player.seekTo(currentTime + seconds, true);
    player.playVideo();
  }
};

// function resetInterval() {
//   clearInterval(monitor);
//   var monitor = setInterval(clickHandler, 100);
// };
//
//
// function clickHandler() {
//   var elem = document.activeElement;
//   if (elem && elem.tagName == 'IFRAME') {
//
//     // alert('clicked!');
//     console.log('click');
//     clearInterval(monitor);
//     // setInterval(clickHandler, 1000);
//   }
// };
//
// resetInterval()

const FistGesture = new fp.GestureDescription('fist'); // ✊️
const OpenPalmGesture = new fp.GestureDescription('open_palm'); // 🖐
const PointLeftGesture = new fp.GestureDescription('point_left'); // 🖐
const PointRightGesture = new fp.GestureDescription('point_right'); // 🖐

// Fist
// -----------------------------------------------------------------------------

// thumb: half curled
// accept no curl with a bit lower confidence
FistGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.HalfCurl, 1.0);
FistGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);

// all other fingers: curled
for(let finger of [fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
    FistGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
    FistGesture.addCurl(finger, fp.FingerCurl.HalfCurl, 0.9);
}
// Paper
// -----------------------------------------------------------------------------
// no finger should be curled
for(let finger of fp.Finger.all) {
    OpenPalmGesture.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
}
OpenPalmGesture.addDirection(fp.Finger.Middle, fp.FingerDirection.VerticalUp, 1.0);

PointRightGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
PointRightGesture.addCurl(fp.Finger.Pointer, fp.FingerCurl.NoCurl, 1.0);
PointRightGesture.addDirection(fp.Finger.Pointer, fp.FingerDirection.HorizontalLeft, 1.0);
PointRightGesture.addDirection(fp.Finger.Pointer, fp.FingerDirection.DiagonalUpLeft, 0.5);
PointRightGesture.addDirection(fp.Finger.Pointer, fp.FingerDirection.DiagonalDownLeft, 0.5);
PointRightGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUp, 0.5);
PointRightGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpLeft, 0.9);
PointRightGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalUp, 0.5);
PointRightGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.HorizontalLeft, 0.2);

for(let finger of [fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
  PointRightGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
  PointRightGesture.addCurl(finger, fp.FingerCurl.HalfCurl, 0.9);
}

PointLeftGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
PointLeftGesture.addCurl(fp.Finger.Pointer, fp.FingerCurl.NoCurl, 1.0);
PointLeftGesture.addDirection(fp.Finger.Pointer, fp.FingerDirection.HorizontalRight, 1.0);
PointLeftGesture.addDirection(fp.Finger.Pointer, fp.FingerDirection.DiagonalUpRight, 0.5);
PointLeftGesture.addDirection(fp.Finger.Pointer, fp.FingerDirection.DiagonalDownRight, 0.5);
PointLeftGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUp, 0.5);
PointLeftGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpRight, 0.9);
PointLeftGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalUp, 0.5);
PointLeftGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.HorizontalRight, 0.2);

for(let finger of [fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
  PointLeftGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
  PointLeftGesture.addCurl(finger, fp.FingerCurl.HalfCurl, 0.9);
}


const fingerJoints = {
  thumb: [0, 1, 2, 3, 4],
  indexFinger: [0, 5, 6, 7, 8],
  middleFinger: [0, 9, 10, 11, 12],
  ringFinger: [0, 13, 14, 15, 16],
  pinky: [0, 17, 18, 19, 20],
};

// Infinity Gauntlet Style
const style = {
  0: { color: "yellow", size: 10 },1: { color: "gold", size: 6 },2: { color: "green", size: 10 },3: { color: "gold", size: 6 },4: { color: "gold", size: 6 },
  5: { color: "purple", size: 10 },6: { color: "gold", size: 6 },7: { color: "gold", size: 6 },8: { color: "gold", size: 6 },9: { color: "blue", size: 10 },
  10: { color: "gold", size: 6 },11: { color: "gold", size: 6 },12: { color: "gold", size: 6 },13: { color: "red", size: 10 },14: { color: "gold", size: 6 },
  15: { color: "gold", size: 6 },16: { color: "gold", size: 6 },17: { color: "orange", size: 10 },18: { color: "gold", size: 6 },
  19: { color: "gold", size: 6 },20: { color: "gold", size: 6 },
};

const drawHand = (predictions, ctx) => {
  // Check if we have predictions
  if (predictions.length > 0) {
    // Loop through each prediction
    predictions.forEach((prediction) => {
      // Grab landmarks
      const landmarks = prediction.landmarks;

      // Loop through fingers
      for (let j = 0; j < Object.keys(fingerJoints).length; j++) {
        let finger = Object.keys(fingerJoints)[j];
        //  Loop through pairs of joints
        for (let k = 0; k < fingerJoints[finger].length - 1; k++) {
          // Get pairs of joints
          const firstJointIndex = fingerJoints[finger][k];
          const secondJointIndex = fingerJoints[finger][k + 1];

          // Draw path
          ctx.beginPath();
          ctx.moveTo(
              landmarks[firstJointIndex][0],
              landmarks[firstJointIndex][1]
          );
          ctx.lineTo(
              landmarks[secondJointIndex][0],
              landmarks[secondJointIndex][1]
          );
          ctx.strokeStyle = "plum";
          ctx.lineWidth = 4;
          ctx.stroke();
        }
      }

      // Loop through landmarks and draw em
      for (let i = 0; i < landmarks.length; i++) {
        // Get x point
        const x = landmarks[i][0];
        // Get y point
        const y = landmarks[i][1];
        // Start drawing
        ctx.beginPath();
        ctx.arc(x, y, style[i]["size"], 0, 3 * Math.PI);
        // Set line color
        ctx.fillStyle = style[i]["color"];
        ctx.fill();
      }
    });
  }
};

/////////////////////////////////////////////////////////////////////
(function() {
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var video = document.getElementById('videoElement');
  /////////////////////////////////////////////////////////////////
  if (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true,
      audio:false })
        .then(function (stream) {
          video.srcObject = stream;
        })
        .catch(function (err) {
          console.log("Something went wrong!");
        });
  }
  ///////////////////////////////////////////////////////////////
  video.addEventListener('play',function()
  {
    draw(this, context,640,480);
  },false);
  ///////////////////////////////////////////////////////////////

  let lastGesture = "";
  async function draw(video,context, width, height){
    context.drawImage(video,0,0,width,height);
    const model = await handpose.load();

    const predictions = await model.estimateHands(video);
    // console.log(predictions);
    ///////////////////////////////////////////////////////////
    if (predictions.length > 0){
      for (let i = 0; i < predictions.length; i++) {
        drawHand(predictions,context);

        var probability = predictions[i].handInViewConfidence;
        var prob = (probability*100).toPrecision(5).toString();
        var text = "Confidence:"+prob+"%";
        context.font = "16pt Comic Sans MS";
        context.fillStyle = "#FF0000";
        context.fillText(text,425,20);
        const GE = new fp.GestureEstimator([
          // fp.Gestures.VictoryGesture,
          // fp.Gestures.ThumbsUpGesture,
          FistGesture,
          OpenPalmGesture,
          PointLeftGesture,
          PointRightGesture,
        ]);
        const gesture = await GE.estimate(predictions[0].landmarks, 9);
        console.log('gesture', gesture);
        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
          const maxConfidenceGesture = gesture.gestures.reduce((p, c) => { 
            return (p.confidence > c.confidence) ? p : c;
          });
          console.log(maxConfidenceGesture.name)
          if (maxConfidenceGesture.name == 'open_palm') {
            player.playVideo();
          }
          else if (maxConfidenceGesture.name == 'fist') {
            player.pauseVideo();
          }
          else if (maxConfidenceGesture.name == 'point_left') {
            skip(-10);
          }
          else if (maxConfidenceGesture.name == 'point_right') {
            skip(10);
          }
          // if(gesture == lastGesture) {
          //   console.log("Returned ", gesture.gestures)
          // }
          // lastGesture = gesture;

        }
      }
      //////////////////////////////////////////////////////
    }
    setTimeout(draw,100,video,context,width,height);
    /////////////////////////////////////////////////////////
  }
})();