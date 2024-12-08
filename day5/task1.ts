import readline from "node:readline/promises";
import fs from "node:fs";

const [filename] = Deno.args;
const [rules, updates] = await parseInput(filename);

const correctUpdates: string[][] = [];
outer: for (const update of updates) {
  const prevNums: string[] = [];
  for (const num of update) {
    for (const rule of rules) {
      if (rule[0] === num) {
        if (prevNums.includes(rule[1])) {
          continue outer;
        }
      }
    }
    prevNums.push(num);
  }
  correctUpdates.push(update);
}

const sum = correctUpdates.reduce((acc, curr) => {
  const mid = Math.floor(curr.length / 2);
  return acc + parseInt(curr[mid]);
}, 0);

console.log(sum); // 5248

async function parseInput(filename: string) {
  const readStream = fs.createReadStream(filename);

  const rl = readline.createInterface({
    input: readStream,
  });

  const ruleRe = /\d\d\|\d\d/g;
  const updateRe = /(?:\d\d,)+\d\d/g;

  const rules = [];
  const updates = [];
  for await (const line of rl) {
    if (line.match(ruleRe)) {
      rules.push(line.split("|"));
    } else if (line.match(updateRe)) {
      updates.push(line.split(","));
    }
  }

  return [rules, updates];
}
