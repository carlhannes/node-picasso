# node-picasso (proof of concept & WIP)
Proof of concept of how to run a picasso.js instance in a Node.JS / (and hopefully) WebWorker Environment.
This is not in any way an official way of rendering picasso.js charts in nodejs.

## How does it work
It utilizes `jsdom`, `canvas-prebuilt`, `vm-shim` and a small set of picasso-related hacks to get the SVG output of a picasso.js chart.

## How do i use it
Check out `test.js` but essentially in a node-env you would do this

```js
const picasso = require('node-picasso');

const result = picasso.chart({ 
    settings: {}, /* your settings here */ 
    data: {}, /* data here as usual */
    element: { /* element object is different */
        width: 800,
        height: 600
    }
}); 

console.log(result); // SVG output
```

You might want to wrap it in a try/catch aswell...

## Why
'Cause I wanted to - and hopefully because it's faster than spinning up a headless browser
