# lucky wheel lux 2020

https://theluckywheel.techatjasmin.com/

## Before you open the game

 - Make sure to enable geolocalisation on your device settings before

## Launch game

Game link [https://lwl2020.vercel.app/source/game.html](https://lwl2020.vercel.app/source/game.html)

## Gameplay

You can move virtually by scrolling and move phisically (geolocation).

Moving virtually to go from house to house.

Moving phisically to go inside an open the door, and then outside again. You cannot move to another house without closing the door first

Each house contains an information.

The last house asks a question that requires the knowledge acquired previously. If you are not ready, do not hesitate to go back after collecting more information.

So In a way it is a 2 dimensional game, where you have to walk and think.

If you answered correclty, you win.

Refresh the page to try another. There are currently 2 scenarios oranges and Find The lyer,

## lucky wheel results

 * Web Animations
 * Geolocation API
 * Intersection Observer


### Web Animation

This API let us animate DOM elements. So the game should have DOM elements such as texts, images, svgs, rectangles moving, appearing, disapearing.

We can control animation loop, speed, timing functions, as well as pausing and resuming.

I've never used this specific API before, but I am familiar with CSS animations.


### Geolocation API

We can get the physical location of the user. User approval is required so we need to wait to start the game if the beginning of the game depends on it.

We could use this API in a way that requires the user to phisically move in order to progress in the game.

Created https://github.com/GrosSacASac/globus-sac to help calculate distance during this hackathon.


### Intersection Observer

At some point web developers used crazy inefficient `onscroll` event handlers to lazy load images. Intersection Observer is a general purpose solution to observe specific events on the page. We also have `<img loading="lazy">` nowadays.

For the intersection observer, to observe anything I have to make a game where the user scroll or zooms.


## Unused APIs

https://theluckywheel.techatjasmin.com/#1#faq

 * Canvas API
 * Clipboard API
 * DeviceOrientationEvent
 * File System API
 * Image Capture API
 * IndexedDB
 * Navigator.share()
 * Page Visibility API
 * Performance API 
 * ReadableStream
 * Resize Observer API
 * Service Workers API
 * Web Audio API
 * Web Speech API
 * Web Storage API
 * Web Workers API
 * WebRTC
 * WebSockets API

## How to build the game

For convenience the build ouput is already included in git


### Set up

1. [Download NodeJS 12, 14 or 15](https://nodejs.org/en/)
2. `npm i npm@latest-6 -g`
3. `npm ci`


### build

`npm run bundle`


## About the code

 * Core.js is used for the code architecture https://github.com/mauriciosoares/core.js
 * dom99 is used to handle the view https://dom99.now.sh/
 * rollup and rollup terser is used to bundle and minify all js into one file https://rollupjs.org/guide/en/ 

Serving source in dev and bundle in prod:

```html
<script type="module">
    if (location.hostname === `localhost`) {
        import("./js/main.js");
    } else {
        import("../built/bundle.es.min.js");
    }
</script>
```

## License

Open an issue