import * as fs from "node:fs";
import * as readline from "node:readline/promises";

const readStream = fs.createReadStream("./input.txt");
const rl = readline.createInterface({
  input: readStream,
});

// O(MN^2)
let safeCounter = 0;
let singleErrors = 0;
for await (const line of rl) {
  const report = line.split(/\s+/).map((item) => parseInt(item));
  if (isSafe(report)) {
    safeCounter++;
  } else {
    const variants = genReportVariants(report);
    for (const reportVariant of variants) {
      if (isSafe(reportVariant)) {
        safeCounter++;
        singleErrors++;
        break;
      }
    }
  }
}

function genReportVariants(report: number[]) {
  const result = [];
  for (let index = 0; index < report.length; index++) {
    result.push(report.toSpliced(index, 1));
  }
  return result;
}

function isSafe(report: number[]) {
  const diff = report
    .map((item, i, arr) => {
      if (i === 0) {
        return 0;
      } else {
        return item - arr[i - 1];
      }
    })
    .slice(1);
  const isMonotone = diff.every((item, _, arr) => {
    const isIncreasing = arr[0] > 0;
    return isIncreasing === item > 0;
  });
  const isInRange = diff.every((item) => {
    return Math.abs(item) >= 1 && Math.abs(item) <= 3;
  });

  return isMonotone && isInRange;
}

// { safeCounter: 349, singleErrors: 67 }
console.log({ safeCounter, singleErrors });
