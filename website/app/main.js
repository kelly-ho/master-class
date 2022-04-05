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
  console.log(transcript);
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
  console.log("HELLOOOOO");
  console.log(document.getElementById("title"));
  document.getElementById("title").focus();
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
