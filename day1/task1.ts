import * as readline from 'node:readline/promises';
import * as fs from 'node:fs'; 

const readStream = fs.createReadStream('./input.txt');

const rl = readline.createInterface({
  input: readStream 
})

const arrA = [];
const arrB = [];
for await (const line of rl) {
  const [valueA, valueB] =  line.split(/\s+/);
  arrA.push(parseInt(valueA));
  arrB.push(parseInt(valueB));
}

const sorter = (a: number,b: number) => a - b;
const sortedA = arrA.sort(sorter);
const sortedB = arrB.sort(sorter);

const sumDiff = sortedA.reduce((acc, valA, i) => {
  const valB = sortedB[i]; 
  acc += Math.abs(valA - valB);
  return acc;
}, 0)

console.log(sumDiff) // 2057374
