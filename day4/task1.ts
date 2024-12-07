import readline from "node:readline/promises";
import fs from "node:fs";
const [filename] = Deno.args;
const grid = await createCharacterGrid(filename);
const dirs = [
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
];
const letters = ["M", "A", "S"];

console.log(searchXMAS()) 

function searchXMAS() {
  let wordCount = 0;
  const xPositions = getXPositions(grid);

  for (const startPos of xPositions) {
    for (const dir of dirs) {
      let isMatchForXMAS = true;
      for (let i = 1; i <= letters.length; i++) {
        isMatchForXMAS =
          grid[startPos[0] + i * dir[0]]?.[startPos[1] + i * dir[1]] ===
          letters[i - 1];
        if (!isMatchForXMAS) {
          break;
        }
      }
      if (isMatchForXMAS) {
        wordCount++;
      }
    }
  }

  return wordCount;
}

function getXPositions(grid: string[][]) {
  const result = [];
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === "X") {
        result.push([row, col]);
      }
    }
  }
  return result;
}

async function createCharacterGrid(filename: string) {
  const readStream = fs.createReadStream(filename);
  const rl = readline.createInterface({
    input: readStream,
  });
  const grid = [];
  for await (const line of rl) {
    grid.push(line.split(""));
  }

  return grid;
}
