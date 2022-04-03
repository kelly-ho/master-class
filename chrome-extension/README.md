# Usage
\*\* Once the extension is installed simply navigate to any page that offers
HTML5 video ([example](http://www.youtube.com/watch?v=E9FxNzv1Tr8)), and you'll
see a speed indicator in top left corner. Hover over the indicator to reveal the
controls to accelerate, slowdown, and quickly rewind or advance the video. Or,
even better, simply use your keyboard:

- **S** - decrease playback speed.
- **D** - increase playback speed.
- **R** - reset playback speed to 1.0x.
- **Z** - rewind video by 10 seconds.
- **X** - advance video by 10 seconds.
- **G** - toggle between current and user configurable preferred speed.
- **V** - show/hide the controller.

You can customize and reassign the default shortcut keys in the extensions
settings page, as well as add additional shortcut keys to match your
preferences. For example, you can assign multiple different "preferred speed"
shortcuts with different values, which will allow you to quickly toggle between
your most commonly used speeds. To add a new shortcut, open extension settings
and click "Add New".

![settings Add New shortcut](https://user-images.githubusercontent.com/121805/50726471-50242200-1172-11e9-902f-0e5958387617.jpg)

Some sites may assign other functionality to one of the assigned shortcut keys —
these collisions are inevitable, unfortunately. As a workaround, the extension
listens both for lower and upper case values (i.e. you can use
`Shift-<shortcut>`) if there is other functionality assigned to the lowercase
key. This is not a perfect solution, as some sites may listen to both, but works
most of the time.