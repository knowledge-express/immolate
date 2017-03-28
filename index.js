#!/usr/bin/env node

const clc = require('cli-color');
const map = require('map-stream');
const minimist = require('minimist');
const fireColors = [196, 202, 208, 214, 220, 226];
const iceColors = [27, 33, 39, 75, 117, 159, 195, 231];
const matrixColors = [22, 28, 34, 40, 46, 82, 119, 157];

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
const redpill = argv['matrix'] || argv['m'];

const painters = !(fireUp || coolDown || redpill) ? firestarters : [
  ...(coolDown ? extinguishers : []),
  ...(fireUp ? firestarters : []),
  ...(redpill ? matrix : [])
];

const line = string => {
  const x = Math.round(a + b + b * Math.sin(i++ * q));
  // const x = (a + (i++ % b));
  const regex = new RegExp(`(.|[\r\n]){1,${x}}`, 'g');
  return string.toString().match(regex).map((substring, j) => painters[j % painters.length](substring)).join('') + "\r";
}


process.stdin.pipe(map((data, callback) => callback(null, line(data)))).pipe(process.stdout);
