const text = await Deno.readTextFile("input.txt");
const mulRegex = /mul\((\d{1,3})\,(\d{1,3})\)/g;
const matches = text.matchAll(mulRegex);

const results = [];
for (const match of matches) {
  const [_, op1, op2] = match;
  results.push(parseInt(op1) * parseInt(op2));
}

const sum = results.reduce((curr, acc) => curr + acc);

console.log(sum);
