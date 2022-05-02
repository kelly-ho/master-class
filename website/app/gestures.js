
const FistGesture = new fp.GestureDescription('fist'); // ✊️
const OpenPalmGesture = new fp.GestureDescription('open_palm'); // 🖐
const PointLeftGesture = new fp.GestureDescription('point_left');
const PointRightGesture = new fp.GestureDescription('point_right');
const PointUpGesture = new fp.GestureDescription('point_up');
const PointDownGesture = new fp.GestureDescription('point_down');
const ThumbsUpGesture = new fp.GestureDescription('thumbs_up');
const ThumbsDownGesture = new fp.GestureDescription('thumbs_down');


// Fist
// -----------------------------------------------------------------------------

// thumb: half curled
FistGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.HalfCurl, 1.0);
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

for(let finger of [fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
    PointLeftGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
    PointLeftGesture.addCurl(finger, fp.FingerCurl.HalfCurl, 0.9);
}

// Thumbs up
// -----------------------------------------------------------------------------
ThumbsUpGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
ThumbsUpGesture.addCurl(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpRight, 1.0);
ThumbsUpGesture.addCurl(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpLeft, 1.0);
// all other fingers: curled
for(let finger of [fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
    ThumbsUpGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
    ThumbsUpGesture.addCurl(finger, fp.FingerCurl.HalfCurl, 0.7);
}
ThumbsUpGesture.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpLeft, 1.0);
ThumbsUpGesture.addDirection(fp.Finger.Index, fp.FingerDirection.HorizontalLeft, 0.8);
ThumbsUpGesture.addDirection(fp.Finger.Index, fp.FingerDirection.HorizontalRight, 0.8);
ThumbsUpGesture.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpRight, 1.0);

// Thumbs down
// -----------------------------------------------------------------------------
ThumbsDownGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
ThumbsDownGesture.addCurl(fp.Finger.Thumb, fp.FingerDirection.DiagonalDownRight, 1.0);
ThumbsDownGesture.addCurl(fp.Finger.Thumb, fp.FingerDirection.DiagonalDownLeft, 1.0);
// all other fingers: curled
for(let finger of [fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
    ThumbsDownGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
    ThumbsDownGesture.addCurl(finger, fp.FingerCurl.HalfCurl, 0.7);
}
ThumbsDownGesture.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalDownLeft, 1.0);
ThumbsDownGesture.addDirection(fp.Finger.Index, fp.FingerDirection.HorizontalLeft, 0.8);
ThumbsDownGesture.addDirection(fp.Finger.Index, fp.FingerDirection.HorizontalRight, 0.8);
ThumbsDownGesture.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalDownRight, 1.0);

// Point up
// -----------------------------------------------------------------------------
PointUpGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.HorizontalLeft, 1.0);
PointUpGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.HorizontalRight, 1.0);
PointUpGesture.addDirection(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
for(let finger of [fp.Finger.Pointer, fp.Finger.Middle]) {
    PointUpGesture.addCurl(finger, fp.FingerCurl.NoCurl, 1.5);
    PointUpGesture.addDirection(finger, fp.FingerDirection.VerticalUp, 1.5);
}
for(let finger of [fp.Finger.Ring, fp.Finger.Pinky]) {
    PointUpGesture.addCurl(finger, fp.FingerCurl.FullCurl, 0.7);
    PointUpGesture.addCurl(finger, fp.FingerCurl.HalfCurl, 1.0);
    PointUpGesture.addDirection(finger, fp.FingerDirection.VerticalDown, 1.0);
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
