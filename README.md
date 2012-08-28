jquery.threesixty
====== 

A jQuery plugin for 360 image rotations. Use a vertical/horizontal spritesheet (recommending [Sprite Factory](https://github.com/jakesgordon/sprite-factory)) as a background-image on an element, call the plugin on the element, and magic happens. Much `<3` to [Aaron Bohenick](http://aaronbohenick.com/) for cat statue renders~

Options
---

* `dragAxis` takes either a string of `x` or `y` indicating the axis in which the mouse drag should trigger a sprite change (default: `'x'`)
* `spriteDim` takes an object with an `x` and `y` property of the dimensions of a single sprite
* `spriteSheetDim` takes an object with an `x` and `y` property of the dimensions of the entire image
* `sensitivity` a number of how many pixels a drag has to move to trigger the next frame of the animation (default: `3`)

Example
---
```
<div class="threesixty" style="height:390px; width:280px; background-image: url(360.jpg);"></div>
<script>
    $('.threesixty').threesixty({
        dragAxis: 'x',
        spriteDim: { x: 280, y: 390 },
        spriteSheetDim: { x: 280, y: 15600 }
        sensitivity: 3
    });
</script>
```

Contributing
---
This project uses [smoosh](https://github.com/fat/smoosh) for compiling, linting.
