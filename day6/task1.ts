import readline from "node:readline/promises";
import fs from "node:fs";
type Dir = "^" | ">" | "v" | "<";
type DirVect = [0, 1] | [1, 0] | [0, -1] | [-1, 0];
type Guard = {
  pos: [number, number];
  dir: Dir;
  rotate: () => void;
};
const dirMapping: {
  [key in Dir]: DirVect;
} = {
  "^": [0, -1],
  ">": [1, 0],
  v: [0, 1],
  "<": [-1, 0],
};
const dirs: Dir[] = ["^", ">", "v", "<"];
const [filename] = Deno.args;
const [grid, guard] = await parseInput(filename);
if (guard) {
  const visited = traverseGrid(grid, guard);
  const visitedUnique = new Set(visited);
  console.log([...visitedUnique].length);
} else {
  console.log("Guard not found");
}

function traverseGrid(grid: string[][], guard: Guard) {
  const visited = [];
  let isOutOfBound = false;
  while (!isOutOfBound) {
    const nextPos: [number, number] = [
      guard.pos[0] + dirMapping[guard.dir][0],
      guard.pos[1] + dirMapping[guard.dir][1],
    ];
    const isNextBlocked = grid[nextPos[1]]?.[nextPos[0]] === "#";
    if (isNextBlocked) {
      guard.rotate();
      continue;
    }
    visited.push(guard.pos.toString());
    guard.pos = nextPos;
    isOutOfBound = grid[guard.pos[1]]?.[guard.pos[0]] === undefined;
  }

  return visited;
}

async function parseInput(
  filename: string
): Promise<[string[][], Guard | null]> {
  const readStream = fs.createReadStream(filename);
  const rl = readline.createInterface({
    input: readStream,
  });
  const grid = [];
  let guard: Guard | null = null;
  let lineNo = 0;
  for await (const line of rl) {
    const guardRE = /[<>^v]/;
    const match = line.match(guardRE);
    if (match) {
      guard = {
        pos: [match.index as number, lineNo],
        dir: match[0] as Dir,
        rotate: function () {
          this.dir = dirs[(dirs.indexOf(this.dir) + 1) % dirs.length];
        },
      };
    }
    grid.push(line.split(""));
    lineNo++;
  }

  return [grid, guard];
}
