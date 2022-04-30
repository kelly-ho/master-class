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
