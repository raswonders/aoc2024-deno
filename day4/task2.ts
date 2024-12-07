import readline from "node:readline/promises";
import fs from "node:fs";
const [filename] = Deno.args;
const grid = await createCharacterGrid(filename);

console.log(searchXMAS2()); // 1916

function searchXMAS2() {
  let xmasCount = 0;
  const aPositions = getAPositions(grid);

  for (const startPos of aPositions) {
    const diagonaleWord =
      grid[startPos[0] - 1]?.[startPos[1] + 1] +
      "A" +
      grid[startPos[0] + 1]?.[startPos[1] - 1];
    const antiDiagonaleWord =
      grid[startPos[0] - 1]?.[startPos[1] + -1] +
      "A" +
      grid[startPos[0] + 1]?.[startPos[1] + 1];

    if (diagonaleWord === "MAS" || diagonaleWord === "SAM") {
      if (antiDiagonaleWord === "MAS" || antiDiagonaleWord === "SAM") {
        xmasCount++;
      }
    }
  }

  return xmasCount;
}

function getAPositions(grid: string[][]) {
  const result = [];
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === "A") {
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
