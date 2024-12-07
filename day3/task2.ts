const text = await Deno.readTextFile("input.txt");
const mulRegexExtended = /mul\((\d{1,3})\,(\d{1,3})\)|do\(\)|don't\(\)/g;
const matches = text.matchAll(mulRegexExtended);

const results = [];
let mulEnabled = true;
for (const match of matches) {
  if (match[0].startsWith("mul")) {
    if (mulEnabled) {
      const [_, op1, op2] = match;
      results.push(parseInt(op1) * parseInt(op2));
    }
  } else if (match[0] === "do()") {
    mulEnabled = true;
  } else if (match[0] === "don't()") {
    mulEnabled = false;
  }
}

const sum = results.reduce((curr, acc) => curr + acc);

console.log(sum);
