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
                     {color: '#00FF00', lineWidth: 5});
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
  modelComplexity: 0,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});
hands.onResults(onResults);

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({image: videoElement});
  },
  width: 256,
  height: 192
});
camera.start();

async function fingerpose(predictions, hands){
    let pred_gestures = [];
    if (predictions.length > 0){
      for (let i = 0; i < predictions.length; i++) {
        const GE = new fp.GestureEstimator([
          PointDownGesture,
          FistGesture,
          OpenPalmGesture,
          PointLeftGesture,
          PointRightGesture,
          PointUpGesture,
        ]);
        const new_prediction = reformat_prediction(predictions[i]);
        const gesture = await GE.estimate(new_prediction, 8);
        //console.log('gesture', gesture);

        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
          const maxConfidenceGesture = gesture.gestures.reduce((p, c) => { 
            return (p.confidence > c.confidence) ? p : c;
          });
          //console.log(maxConfidenceGesture.name)
          pred_gestures.push(hands[i] + " " + maxConfidenceGesture.name);
          document.getElementById("gestureDebug").innerHTML = "GESTURE DEBUG: " + maxConfidenceGesture.name;
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
          else if (maxConfidenceGesture.name == 'point_up'){
            var volume = player.getVolume() + 10;
            player.setVolume(Math.max(Math.min(volume, 100), 0));
          }
          else if (maxConfidenceGesture.name == 'point_down'){
            var volume = player.getVolume() - 10;
            player.setVolume(Math.max(Math.min(volume, 100), 0));
          }
        }
      }
    }
    console.log(pred_gestures);
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
    if (hand['label'] == "Right"){
      hands.push("Left");
    }else{
      hands.push("Right");
    }

  }
  return hands;
}