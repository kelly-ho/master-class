/*****************************************************************/
/******** SPEECH RECOGNITION SETUP YOU CAN IGNORE ****************/
/*****************************************************************/
DEBUGSPEECH=true;
var debouncedProcessSpeech = _.debounce(processSpeech, 500);
var colors = [ 'masterclass', 'play', 'pause' ];
var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'
var speechRecognitionList = new webkitSpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
var recognition = new webkitSpeechRecognition();
recognition.grammars = speechRecognitionList;
recognition.continuous = true;
recognition.interimResults = true;
recognition.onresult = function(event) {
  // Build the interim transcript, so we can process speech faster
  var transcript = '';
  var hasFinal = false;
  for (var i = event.resultIndex; i < event.results.length; ++i) {
    if (event.results[i].isFinal)
      hasFinal = true;
    else
      transcript += event.results[i][0].transcript;
  }

  if (DEBUGSPEECH) {
    if (hasFinal) {
      document.getElementById("speechDebug").innerHTML = "SPEECH DEBUG:";
    } 
    else{
      document.getElementById("speechDebug").innerHTML = "SPEECH DEBUG: " + transcript;
    }
  }

  var processed = debouncedProcessSpeech(transcript);

  // If we reacted to speech, kill recognition and restart
  if (processed) {
    recognition.stop();
  }
};
// Restart recognition if it has stopped
recognition.onend = function(event) {
  setTimeout(function() {
    if (DEBUGSPEECH) {
      document.getElementById("speechDebug").innerHTML = "SPEECH DEBUG: ready";
    }
    recognition.start();
  }, 1000);
};
recognition.start();
/*****************************************************************/
/******** END OF SPEECH RECOG SETUP ******************************/
/*****************************************************************/

