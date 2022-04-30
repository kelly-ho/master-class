
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
PointUpGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpLeft, 1.0);
PointUpGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpRight, 1.0);
PointUpGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalUp, 1.0);
PointUpGesture.addCurl(fp.Finger.Pointer, fp.FingerCurl.NoCurl, 1.5);
PointUpGesture.addDirection(fp.Finger.Pointer, fp.FingerDirection.VerticalUp, 1.5);
for(let finger of [fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
    PointUpGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
    PointUpGesture.addCurl(finger, fp.FingerCurl.HalfCurl, 1.0);
    PointUpGesture.addDirection(finger, fp.FingerDirection.HorizontalLeft, 0.9);
    PointUpGesture.addDirection(finger, fp.FingerDirection.HorizontalRight, 0.9);
    PointUpGesture.addDirection(finger, fp.FingerDirection.DiagonalUpLeft, 0.9);
    PointUpGesture.addDirection(finger, fp.FingerDirection.DiagonalUpRight, 0.9);

}

/*
[
    [
        "Thumb",
        "No Curl",
        "Diagonal Up Right"
    ],
    [
        "Index",
        "No Curl",
        "Vertical Up"
    ],
    [
        "Middle",
        "Half Curl",
        "Diagonal Up Right"
    ],
    [
        "Ring",
        "Half Curl",
        "Diagonal Up Right"
    ],
    [
        "Pinky",
        "Half Curl",
        "Horizontal Right"
    ]
]

[
    [
        "Thumb",
        "No Curl",
        "Diagonal Up Left"
    ],
    [
        "Index",
        "No Curl",
        "Vertical Up"
    ],
    [
        "Middle",
        "Full Curl",
        "Diagonal Up Left"
    ],
    [
        "Ring",
        "Full Curl",
        "Diagonal Up Left"
    ],
    [
        "Pinky",
        "Half Curl",
        "Diagonal Up Left"
    ]
]
 */

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