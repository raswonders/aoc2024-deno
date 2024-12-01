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

const indexB = new Map();
arrB.forEach(item => {
  if (indexB.has(item)) {
    indexB.set(item, indexB.get(item) + 1)
  } else {
    indexB.set(item, 1)
  }
})

const sumSimilarity = arrA.reduce((acc, valA) => {
  acc += indexB.has(valA) ? valA * indexB.get(valA) : 0;
  return acc;
}, 0)

console.log(sumSimilarity); // 23177084
