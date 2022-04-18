import { GestureDescription, Finger, FingerCurl } from 'fingerpose';

const FistGesture = new GestureDescription('fist'); // ✊️
const OpenPalmGesture = new GestureDescription('open_palm'); // 🖐


// Fist
// -----------------------------------------------------------------------------

// thumb: half curled
// accept no curl with a bit lower confidence
FistGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
FistGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.5);

// all other fingers: curled
for(let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
    FistGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
    FistGesture.addCurl(finger, FingerCurl.HalfCurl, 0.9);
}


// Paper
// -----------------------------------------------------------------------------

// no finger should be curled
for(let finger of Finger.all) {
    OpenPalmGesture.addCurl(finger, FingerCurl.NoCurl, 1.0);
}

export {
    FistGesture, OpenPalmGesture
}
