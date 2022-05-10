// processSpeech(transcript)
//  Is called anytime speech is recognized by the Web Speech API
// Input:
//    transcript, a string of possibly multiple words that were recognized
// Output:
//    processed, a boolean indicating whether the system reacted to the speech or not
var processSpeech = function(transcript, hasFinal) {
  transcript = transcript.toLowerCase();
  if (transcript.includes("master class")){
    transcript = transcript.replace("master class", "masterclass")
  }
  // Helper function to detect if any commands appear in a string
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
  }
  if (userSaid(transcript, ['masterclass stop', 'masterclass pause'])) {
    player.pauseVideo();
  }
  if (userSaid(transcript, ['masterclass restart'])) {
    player.seekTo(Number('0'), true);
  }
  if (userSaid(transcript, jumpCommands)) {
    var time = parseTimeVolumeSpeed(transcript, jumpCommands, 'jump');
    if (time !== null && (0 <= time < 60 ||  1000 <=time < 6000)) {
      time = time%100 + Math.floor(time/100)*60;
      player.seekTo(time, true);
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
  if (userSaid(transcript, ['masterclass skip', 'masterclass forward', 'masterclass forwards'])) {
    player.seekTo(player.getCurrentTime()+10, true);
  }
  if (userSaid(transcript, ['masterclass rewind', 'masterclass backward', 'masterclass backwards'])) {
    player.seekTo(player.getCurrentTime()-10, true);
  }
  if (userSaid(transcript, volumeCommands)) {
    var volume = parseTimeVolumeSpeed(transcript, volumeCommands, 'volume');
    if (volume !== null) {
      player.setVolume(Math.max(Math.min(volume, 100), 0));
    }
  }
  if (userSaid(transcript, ['masterclass volume up', 'masterclass louder'])) {
    var volume = player.getVolume() + 10;
    player.setVolume(Math.max(Math.min(volume, 100), 0));
  }
  if (userSaid(transcript, ['masterclass volume down', 'masterclass quieter'])) {
    var volume = player.getVolume() - 10;
    player.setVolume(Math.max(Math.min(volume, 100), 0));
  }
  if (userSaid(transcript, ['masterclass mute', 'masterclass volume off'])) {
    player.mute();
  }
  if (userSaid(transcript, ['masterclass unmute', 'masterclass volume on'])) {
    player.unMute();
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