const puzzleArr1 = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9],
];

const puzzleArr2 = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 0, 3, 4, 8],
  [1, 0, 0, 3, 4, 2, 5, 6, 0],
  [8, 5, 9, 7, 6, 1, 0, 2, 0],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 0, 1, 5, 3, 7, 2, 1, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 0, 0, 4, 8, 1, 1, 7, 9],
];

function validatePuzzle(arr) {
  let passedTests = 0;
  //Test 9 Rows
  let arrCopy = arr.map((a) => a.slice()); // create deep copy of puzzle.
  for (let i = 0; i < 9; i++) {
    if (test(arrCopy[i])) passedTests++;
  }
  //Test 9 Columns
  arrCopy = arr.map((a) => a.slice()); // create deep copy of puzzle.
  for (let j = 0; j < 9; j++) {
    let testArr = [];
    for (let i = 0; i < 9; i++) {
      testArr.push(arrCopy[i][j]);
    }
    if (test(testArr)) passedTests++;
  }
  //Test 9 3x3 Squares
  arrCopy = arr.map((a) => a.slice()); // create deep copy of puzzle.
  for (let xSqr = 0; xSqr < 9; xSqr += 3) {
    for (let ySqr = 0; ySqr < 9; ySqr += 3) {
      testArr = [];
      for (let i = xSqr; i < xSqr + 3; i++) {
        for (let j = ySqr; j < ySqr + 3; j++) {
          testArr.push(arrCopy[i][j]);
        }
      }
      if (test(testArr)) passedTests++;
    }
  }
  //Test individual row, column or square - called 27 times.
  //Each row, column or 3x3 square busy contain the digits 1-9 once and only once.
  function test(testArr) {
    testArr.sort((a, b) => a - b);
    return testArr.join("") === "123456789";
  }
  return passedTests === 27 ? true : false; // All 27 tests must pass.
}

console.log(validatePuzzle(puzzleArr1));
console.log(validatePuzzle(puzzleArr2));
