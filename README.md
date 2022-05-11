# master-class
## 6.835 Final Project

MasterClass enables users to manipulate Youtube videos with voice and gesture commands. Our system supports eight gesture commands and over twenty voice commands to play or pause the video, change the volume or speed, skip or rewind, and jump to different timestamps. We utilize the HandPose ML model and the FingerPose library for Gesture Recognition and the WebSpeech API for Speech Recognition. The final product is a web app that allows users to learn new skills from a YouTube video without being at the laptop.

![image info](./img/github.jpeg)

Requirements: Chrome Browser, Laptop (MacOS or Windows), Webcam, Microphone.

To run,
1. Type 
``python -m http.server`` in the command line. (we use Python 3)
2. Go to localhost:8000 on Chrome

Note: Permissions for microphone and camera must be enabled.

Code:
- index.html is the website backbone
- css/app.css is where the CSS for the UI is found
- app/gestures.js is for gesture recognition with FingerPose 
- app/hands.js is for HandPose detect 21 landmarks of the hand from the webcam
- app/setupSpeech.js is for setting up WebSpeech API
- app/speech.js is for activating speech commands
- app/youtube.js is for embedding the YouTube video

Libary Versions are included in the ``lib`` or directly imported in index.html

We tested on a 2019 MacBook Pro running MacOS 10.15.7 with 16 GB of RAM. Chrome was on Version 100.0.4896.127.