import readline from "node:readline/promises";
import fs from "node:fs";

const [filename] = Deno.args;
const rules: {
  [key: string]: string[];
} = {};
const updates: string[][] = [];
await parseInput(filename);

const correctedUpdates = [];
outer: for (const update of updates) {
  let hasCorrection = false;
  inner: while (true) {
    const updateCopy = [...update];
    for (let i = 0; i < updateCopy.length; i++) {
      for (let j = 0; j < i; j++) {
        if (rules?.[updateCopy[i]]?.includes(updateCopy[j])) {
          update.splice(j, 1);
          update.splice(i + 1, 0, updateCopy[j]);
          hasCorrection = true;
          continue inner;
        }
      }
    }
    if (hasCorrection) {
      console.log(`update ${update} corrected!`);
      correctedUpdates.push(update);
    } else {
      console.log(`update ${update} checked`);
    }
    continue outer;
  }
}

const sum = correctedUpdates.reduce((acc, curr) => {
  const mid = Math.floor(curr.length / 2);
  return acc + parseInt(curr[mid]);
}, 0);

console.log(sum);

async function parseInput(filename: string) {
  const readStream = fs.createReadStream(filename);

  const rl = readline.createInterface({
    input: readStream,
  });

  const ruleRe = /\d\d\|\d\d/g;
  const updateRe = /(?:\d\d,)+\d\d/g;

  for await (const line of rl) {
    if (line.match(ruleRe)) {
      const [start, end] = line.split("|");
      if (rules[start]) {
        rules[start].push(end);
      } else {
        rules[start] = [end];
      }
    } else if (line.match(updateRe)) {
      updates.push(line.split(","));
    }
  }
}
