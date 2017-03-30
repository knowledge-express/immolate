#!/usr/bin/env node

const clc = require('cli-color');
const map = require('map-stream');
const minimist = require('minimist');
const fireColors = [196, 202, 208, 214, 220, 226, 220, 214, 208, 202];
const iceColors = [27, 33, 39, 75, 117, 159, 195, 231, 195, 159, 117, 75, 39, 33];
const matrixColors = [22, 28, 34, 40, 46, 82, 119, 157, 119, 82, 46, 40, 34, 28];

const firestarters = fireColors.map(clc.xterm);
const extinguishers = iceColors.map(clc.xterm);
const matrix = matrixColors.map(clc.xterm);

const argv = minimist(process.argv.slice(2));

const a = 4;
const b = 3;
const q = 1/5;
let i = 0;

const fireUp = argv['fire'] || argv['f'];
const coolDown = argv['ice'] || argv['i'];
const redPill = argv['matrix'] || argv['m'];

const painters = !(fireUp || coolDown || redPill) ? firestarters : [
  ...(coolDown ? extinguishers : []),
  ...(fireUp ? firestarters : []),
  ...(redPill ? matrix : [])
];

const line = buffer => {
  const string = buffer.toString();
  const x = Math.round(a + b + b * Math.sin(i++ * q) + 3 * Math.random());
  const chunks = [];
  for (let i = 0; i * x < buffer.length; i++) {
    const painter = painters[i % painters.length];
    const chunk = painter(string.slice(i * x, (i + 1) * x));
    chunks.push(chunk);
  }

  return chunks.join('');
}


process.stdin.pipe(map((data, callback) => callback(null, line(data)))).pipe(process.stdout);
