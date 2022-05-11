const videoElement = document.getElementsByClassName('videoElement')[0];
const canvasElement = document.getElementsByClassName('canvas')[0];
const canvasCtx = canvasElement.getContext('2d');

function onResults(results) {
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(
      results.image, 0, 0, canvasElement.width, canvasElement.height);
  if (results.multiHandLandmarks) {
    for (const landmarks of results.multiHandLandmarks) {
      drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS,
                     {color: '#00FF00', lineWidth: 1});
      drawLandmarks(canvasCtx, landmarks, {color: '#FF0000', lineWidth: 2});
    }
  }
  canvasCtx.restore();
  const hands = getHands(results.multiHandedness);
  fingerpose(results.multiHandLandmarks, hands);
}

const hands = new Hands({locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
}});
console.log("LOADED");
hands.setOptions({
  maxNumHands: 2,
  modelComplexity: 1,
  minDetectionConfidence: 0.8,
  minTrackingConfidence: 0.8
});
hands.onResults(onResults);
// const model = handpose.load(); //this is the slower version of handpose

var cameraWidth = 256;
var cameraHeight = 192;
const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({image: videoElement});
    // model.estimateHands(videoElement).then((prediction, err)=>console.log(prediction)); //this is the slower version of handpose
  },
  width: cameraWidth,
  height: cameraHeight
});
camera.start();

let lastGestureLeft = "";
let lastGestureRight = "";
let gestureDuration = 0;
const requiredDuration = 250;
let predictionStartTS = Date.now();

async function fingerpose(predictions, hands){
    let pred_gestures = {'Right': "", 'Left': ""};
    if (predictions.length > 0){
      for (let i = 0; i < predictions.length; i++) {
        const GE = new fp.GestureEstimator([
          PointDownGesture,
          FistGesture,
          OpenPalmGesture,
          PointLeftGesture,
          PointRightGesture,
          ThumbsUpGesture,
          ThumbsDownGesture,
          PointUpGesture,
        ]);
        const new_prediction = reformat_prediction(predictions[i]);
        const gesture = await GE.estimate(new_prediction, 8);
        //console.log(gesture);

        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
          const maxConfidenceGesture = gesture.gestures.reduce((p, c) => { 
            return (p.confidence > c.confidence) ? p : c;
          });
          pred_gestures[hands[i]] = maxConfidenceGesture.name;
        }
      }
    }
    if (pred_gestures['Right'].length > 0 || pred_gestures['Left'].length > 0){
      document.getElementById("gestureDebug").innerHTML = "Gesture: " + gesturesToString(pred_gestures);
    }else{
      document.getElementById("gestureDebug").innerHTML = "Gesture: No hands in frame";
    }

    if(pred_gestures["Left"] === lastGestureLeft && pred_gestures["Right"] === lastGestureRight) {
        const deltaTime = Date.now() - predictionStartTS;
        gestureDuration += deltaTime;
    }
    else {
        //UI.setPlayerHand(playerGesture);
        lastGestureLeft = pred_gestures["Left"];
        lastGestureRight = pred_gestures["Right"];
        gestureDuration = 0;
    }
    predictionStartTS = Date.now();

    if (isGesture(pred_gestures, 'open_palm')) {
        player.playVideo();
        gestureDuration = 0;
    }
    else if (isGesture(pred_gestures, 'fist')) {
        player.pauseVideo();
        gestureDuration = 0;
    }
    if(gestureDuration > requiredDuration) {
        if (pred_gestures['Left'] === 'open_palm' && pred_gestures['Right'] === 'open_palm') {
            var volume = player.getVolume() + 10;
            player.setVolume(Math.max(Math.min(volume, 100), 0));
        }
        else if (pred_gestures['Left'] === 'fist' && pred_gestures['Right'] === 'fist') {
            var volume = player.getVolume() - 10;
            player.setVolume(Math.max(Math.min(volume, 100), 0));
        }
        else if (isGesture(pred_gestures, 'thumbs_up')) {
            increaseSpeed();
        }
        else if (isGesture(pred_gestures, 'thumbs_down')) {
            decreaseSpeed();
        }
        else if (isGesture(pred_gestures, 'point_left')) {
            skip(-10);
        }
        else if (isGesture(pred_gestures, 'point_right')) {
            skip(10);
        }
        gestureDuration = 0;
    }
}

function reformat_prediction(prediction){
  let new_data = [];
  for (const point of prediction){
    new_data.push(Object.values(point));
  }
  return new_data
}

function getHands(hands_data){
  let hands = [];
  for (const hand of hands_data){
    if (hand['label'] === "Right"){
      hands.push("Left");
    }else{
      hands.push("Right");
    }
  }
  return hands;
}

function isGesture(predictions, gesture){
  return predictions['Right'] === gesture || predictions['Left'] === gesture;
}

function gesturesToString(gestures){
  let str = ""
  for (const gesture of Object.keys(gestures)){
    if (gestures[gesture].length === 0){
      continue;
    } else if (gesture === "Right"){
      str += gestures[gesture] + " (R) ";
    }else if (gesture === "Left"){
      str += gestures[gesture] + " (L) ";
    }
  }
  return str;
}