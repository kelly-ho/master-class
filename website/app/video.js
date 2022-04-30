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

  console.log(results);
  fingerpose(results.multiHandLandmarks);

}

const hands = new Hands({locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
}});
console.log("LOADED");
hands.setOptions({
  maxNumHands: 2,
  modelComplexity: 1,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});
hands.onResults(onResults);
const model = handpose.load();

var cameraWidth = 256;
var cameraHeight = 192;
const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({image: videoElement});
    // model.estimateHands(videoElement).then((prediction, err)=>console.log(prediction));
  },
  width: cameraWidth,
  height: cameraHeight
});
// camera.start();


async function fingerpose(predictions){ 
    if (predictions.length > 0){
      for (let i = 0; i < predictions.length; i++) {
        const GE = new fp.GestureEstimator([
          // fp.Gestures.VictoryGesture,
          PointDownGesture,
          FistGesture,
          OpenPalmGesture,
          PointLeftGesture,
          PointRightGesture,
          PointUpGesture,
        ]);
        curPrediction = predictions[i]
        var rescaledPredictions = []
        for (let j =0; j<21; j++) {
            rescaledPredictions.push(
                {'x': curPrediction[j]['x']*cameraWidth, 
                'y': curPrediction[j]['y']*cameraHeight,
                'z': curPrediction[j]['z']*cameraWidth}
            )
        }
        console.log(rescaledPredictions)
        const gesture = await GE.estimate(rescaledPredictions, 8);
        console.log('gesture', gesture);
        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
          const maxConfidenceGesture = gesture.gestures.reduce((p, c) => { 
            return (p.confidence > c.confidence) ? p : c;
          });
          console.log(maxConfidenceGesture.name)
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
          // if(gesture == lastGesture) {
          //   console.log("Returned ", gesture.gestures)
          // }
          // lastGesture = gesture;

        }
      }
      //////////////////////////////////////////////////////
    }
}