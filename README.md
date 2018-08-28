# node-picasso (proof of concept & WIP)
Proof of concept of how to run a picasso.js instance in a Node.JS / (and hopefully) WebWorker Environment.
This is not in any way an official way of rendering picasso.js charts in nodejs.

## How
It utilizes `jsdom`, `canvas-prebuilt`, `vm-shim` and a small set of picasso-related hacks to get the SVG output of a picasso.js chart.

## Why
'Cause I wanted to - and hopefully because it's faster than spinning up a headless browser
