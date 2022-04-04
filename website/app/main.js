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
  };
  if (userSaid(transcript, ['masterclass stop', 'masterclass pause'])) {
    player.pauseVideo()
  };
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
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
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

let controllerOptions = {enableGestures: true};
let buffer = 0;

Leap.loop(controllerOptions, function(frame) {
  buffer += 1; //buffer so multiple gestures aren't recognized at once
  if(frame.valid && frame.gestures.length > 0 && buffer > 50){
    buffer = 0;
    frame.gestures.forEach(function(gesture){
      switch (gesture.type){
        case "circle":
          console.log("Circle Gesture");
          var clockwise = false;
          var pointableID = gesture.pointableIds[0];
          var direction = frame.pointable(pointableID).direction;
          var dotProduct = Leap.vec3.dot(direction, gesture.normal);
          var clockwise = (dotProduct  >  0);
          if (clockwise){
            skip(10);
            console.log("clockwise");
          }else{
            skip(-10);
          }
          break;
        case "keyTap":
          console.log("Key Tap Gesture");
          break;
        case "screenTap":
          console.log("Screen Tap Gesture");
          break;
        case "swipe":
          console.log("Swipe Gesture");
          break;
      }
    });
  }
});


/***
 * SKIP FORWARD AND BACKWARD
 */
function skip(seconds){
  var currentTime = player.getCurrentTime();
  if((seconds > 0 && currentTime>seconds) || seconds < 0){
    player.seekTo(currentTime - seconds, true);
    player.playVideo();
  }
};
