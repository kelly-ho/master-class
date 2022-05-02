// processSpeech(transcript)
//  Is called anytime speech is recognized by the Web Speech API
// Input:
//    transcript, a string of possibly multiple words that were recognized
// Output:
//    processed, a boolean indicating whether the system reacted to the speech or not
var processSpeech = function(transcript, hasFinal) {
  // Helper function to detect if any commands appear in a string
  transcript = transcript.toLowerCase();
  var userSaid = function(str, commands) {
    for (var i = 0; i < commands.length; i++) {
      if (str.indexOf(commands[i]) > -1)
        return true;
    }
    return false;
  };
  var numDict = {"zero": 0, "one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6, "seven": 7, "eight": 8, "nine": 9, "ten": 10, "eleven": 11, "twelve": 12, "thirteen": 13, "fourteen": 14, "fifteen": 15, "sixteen": 16, "seventeen": 17, "eighteen":18, "nineteen": 19, "twenty": 20, "hundred": 100}
  // Helper function to parse number
  var parseNumber = function(str, type) {
    if (str in numDict){ // in case speech recognition fails to convert str into number
      return numDict[str];
    }
    if(type=='float') {
      return parseFloat(str);
    }
    if(type=='int') {
      return parseInt(str);
    }
  };
  var parseTimeVolumeSpeed = function(str, commands, func) {
    for (var i = 0; i < commands.length; i++) {
      const startOfCommandIndex = str.indexOf(commands[i]);
      if (startOfCommandIndex > -1)
        var new_str = str.substring(startOfCommandIndex+commands[i].length);
        if (!new_str) continue;
        var splitString = new_str.split(/(\s+)/).filter( e => e.trim().length > 0);
        if (splitString.length == 0) continue;
        var candidateNumber = splitString[0];
        candidateNumber = candidateNumber.replace(":", "");
        if (!isNaN(candidateNumber) || candidateNumber in numDict) { // check if string is numeric and turn into int
          if (func == 'time') {
            if (splitString.length <= 1) continue;
            var timeUnit = splitString[1];
            if (timeUnit == 'second' || timeUnit == 'seconds') {
              return parseNumber(candidateNumber, 'int');
            }
            else if (timeUnit == 'minute' || timeUnit == 'minutes') {
              return 60*parseNumber(candidateNumber, 'int');
            }
          }
          else if (func=='speed') {
            return parseNumber(candidateNumber, 'float');
          }
          else if (func == 'volume') {
            return parseNumber(candidateNumber, 'int');
          }
          else if (func == 'jump') {
            return parseNumber(candidateNumber, 'int');
          }
        }
    }
    return null;
  }
  var volumeCommands = ['masterclass set volume to', 'masterclass change volume to'];
  var skipCommands = ['masterclass forward', 'masterclass forwards', 
  'masterclass forwards by', 'masterclass forward by', 
  'masterclass go forward', 'masterclass go forward by', 'masterclass skip'];
  var rewindCommands = ['masterclass backward', 'masterclass backwards', 
  'masterclass backward by', 'masterclass backwards by', 
  'masterclass go backward', 'masterclass go backward by', 'masterclass rewind'];
  var speedCommands = ['masterclass change speed to', 'masterclass set speed to'];
  var jumpCommands = ['masterclass jump to', 'masterclass go to']

  if (userSaid(transcript, ['masterclass play'])) {
    player.playVideo();
    return true;
  }
  if (userSaid(transcript, ['masterclass stop', 'masterclass pause'])) {
    player.pauseVideo();
    return true;
  }
  if (userSaid(transcript, ['masterclass restart'])) {
    player.seekTo(Number('0'), true);
    return true;
  }
  if (userSaid(transcript, jumpCommands)) {
    var time = parseTimeVolumeSpeed(transcript, jumpCommands, 'jump');
    if (time !== null && (0 <= time < 60 ||  1000 <=time < 6000)) {
      time = time%100 + Math.floor(time/100)*60;
      player.seekTo(time, true);
      return true;
    }
  }
  if (userSaid(transcript, skipCommands)) {
    var seconds = parseTimeVolumeSpeed(transcript, skipCommands, 'time');
    if (seconds !== null) {
      player.seekTo(player.getCurrentTime()+seconds, true);
      return true;
    }
  }
  if (userSaid(transcript, rewindCommands)) {
    var seconds = parseTimeVolumeSpeed(transcript, rewindCommands, 'time');
    if (seconds !== null) {
      player.seekTo(player.getCurrentTime()-seconds, true);
      return true;
    }
  }
  if (hasFinal && userSaid(transcript, ['masterclass skip', 'masterclass forward', 'masterclass forwards'])) {
    player.seekTo(player.getCurrentTime()+10, true);
    return true;
  }
  if (hasFinal && userSaid(transcript, ['masterclass rewind', 'masterclass backward', 'masterclass backwards'])) {
    player.seekTo(player.getCurrentTime()-10, true);
    return true;
  }
  if (userSaid(transcript, volumeCommands)) {
    var volume = parseTimeVolumeSpeed(transcript, volumeCommands, 'volume');
    if (volume !== null) {
      player.setVolume(Math.max(Math.min(volume, 100), 0));
      return true; 
    }
  }
  if (hasFinal && userSaid(transcript, ['masterclass volume up', 'masterclass louder'])) {
    var volume = player.getVolume() + 10;
    player.setVolume(Math.max(Math.min(volume, 100), 0));
    return true;
  }
  if (hasFinal && userSaid(transcript, ['masterclass volume down', 'masterclass quieter'])) {
    var volume = player.getVolume() - 10;
    player.setVolume(Math.max(Math.min(volume, 100), 0));
    return true;
  }
  if (userSaid(transcript, ['masterclass mute', 'masterclass volume off'])) {
    player.mute();
    return true;
  }
  if (userSaid(transcript, ['masterclass unmute', 'masterclass volume on'])) {
    player.unMute();
    return true;
  }
  if (userSaid(transcript, speedCommands)) {
    var speed = parseTimeVolumeSpeed(transcript, speedCommands, 'speed');
    if (speed !== null) {
      player.setPlaybackRate(speed); // will be between 0.25 to 2
      return true;
    }
  }

  if (userSaid(transcript, ['masterclass speed up', 'masterclass increase speed'])) {
    increaseSpeed();
    return true;
  }
  if (userSaid(transcript, ['masterclass slow down', 'masterclass decrease speed'])) {
    decreaseSpeed();
    return true;
  }
  
};


const FistGesture = new fp.GestureDescription('fist'); // ✊️
const OpenPalmGesture = new fp.GestureDescription('open_palm'); // 🖐
const PointLeftGesture = new fp.GestureDescription('point_left'); // 🖐
const PointRightGesture = new fp.GestureDescription('point_right'); // 🖐
const PointUpGesture = new fp.GestureDescription('point_up');
const PointDownGesture = new fp.GestureDescription('point_down');


// Fist
// -----------------------------------------------------------------------------

// thumb: half curled
// accept no curl with a bit lower confidence
FistGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.HalfCurl, 1.0);
FistGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);

// all other fingers: curled
for(let finger of [fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
    FistGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
    FistGesture.addCurl(finger, fp.FingerCurl.HalfCurl, 0.7);
}
// Open palm
// -----------------------------------------------------------------------------
// no finger should be curled
for(let finger of fp.Finger.all) {
    OpenPalmGesture.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
}
OpenPalmGesture.addDirection(fp.Finger.Middle, fp.FingerDirection.VerticalUp, 1.0);

// Point right
// -----------------------------------------------------------------------------
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

// Point left
// -----------------------------------------------------------------------------
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

// Point up
// -----------------------------------------------------------------------------
for(let finger of [fp.Finger.Pointer, fp.Finger.Middle]) {
  PointUpGesture.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
  PointUpGesture.addDirection(finger, fp.FingerDirection.VerticalUp, 1.3);

}
for(let finger of [fp.Finger.Thumb, fp.Finger.Ring, fp.Finger.Pinky]) {
  PointUpGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
  PointUpGesture.addCurl(finger, fp.FingerCurl.HalfCurl, 1.0);
  PointUpGesture.addDirection(finger, fp.FingerDirection.VerticalUp, 1.0);
  PointUpGesture.addDirection(finger, fp.FingerDirection.DiagonalUpLeft, 0.5);
  PointUpGesture.addDirection(finger, fp.FingerDirection.DiagonalUpRight, 0.5);

}

// Point down
// -----------------------------------------------------------------------------
for(let finger of [fp.Finger.Pointer, fp.Finger.Middle]) {
  PointDownGesture.addCurl(finger, fp.FingerCurl.NoCurl, 1.0);
  PointDownGesture.addCurl(finger, fp.FingerCurl.HalfCurl, 0.5);
  PointDownGesture.addDirection(finger, fp.FingerDirection.VerticalDown, 1.5);
  PointDownGesture.addDirection(finger, fp.FingerDirection.DiagonalDownLeft, 0.7);
  PointDownGesture.addDirection(finger, fp.FingerDirection.DiagonalDownRight, 0.7);
}
for(let finger of [fp.Finger.Ring, fp.Finger.Pinky]) {
  PointDownGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
  PointDownGesture.addCurl(finger, fp.FingerCurl.HalfCurl, 1.0);
  PointDownGesture.addDirection(finger, fp.FingerDirection.VerticalDown, 1.0);
  PointDownGesture.addDirection(finger, fp.FingerDirection.DiagonalDownLeft, 0.7);
  PointDownGesture.addDirection(finger, fp.FingerDirection.DiagonalDownRight, 0.7);

}
PointDownGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
PointDownGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalDown, 1.0);



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