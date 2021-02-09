//The following two arrays are for test cases.
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
  //This refactoring includes verbose output to the console
  //evaluating 27 total tests and indicating what passed and what failed.

  let passedTests = 0;
  let failedTests = 0;
  console.log("\nEvaluating the Following Puzzle Solution:\n");
  displayPuzzle(arr); // Display the puzzle solution being tested
  //Test Rows
  console.log("\n\nTesting 9 Rows:\n");
  let arrCopy = arr.map((a) => a.slice()); // Create deep copy of puzzle.
  for (let i = 0; i < 9; i++) {
    test(arrCopy[i], "Row " + (i + 1)) ? passedTests++ : failedTests++;
  }
  //Test Columns
  arrCopy = arr.map((a) => a.slice()); // Create deep copy of puzzle.
  console.log("\n\nTesting 9 Columns:\n");
  for (let j = 0; j < 9; j++) {
    let testArr = [];
    for (let i = 0; i < 9; i++) {
      testArr.push(arrCopy[i][j]);
    }
    test(testArr, "Column " + (j + 1)) ? passedTests++ : failedTests++;
  }
  //Test Squares
  arrCopy = arr.map((a) => a.slice()); // Create deep copy of puzzle.
  console.log("\n\nTesting 9 Squares:\n");
  for (let xSqr = 0; xSqr < 9; xSqr += 3) {
    for (let ySqr = 0; ySqr < 9; ySqr += 3) {
      testArr = [];
      for (let i = xSqr; i < xSqr + 3; i++) {
        for (let j = ySqr; j < ySqr + 3; j++) {
          testArr.push(arrCopy[i][j]);
        }
      }
      test(testArr, "Square " + (xSqr + 3) / 3 + "," + (ySqr + 3) / 3)
        ? passedTests++
        : failedTests++;
    }
  }

  //Test individual row, column or square - called 27 times.
  //Each row, column or 3x3 square must contain the digits 1-9 once and only once.
  function test(testArr, testCase) {
    testArr.sort((a, b) => a - b);
    console.log(
      testArr.join("") === "123456789"
        ? `  ${testCase} Passed`
        : `x ${testCase} Failed`
    );
    return testArr.join("") === "123456789";
  }

  //This function displays the puzzle solution in the console ia a pretty format
  function displayPuzzle(arr) {
    let pString = " ";
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (j === 3 || j === 6) pString += " |";
        pString += ` ${arr[i][j]}`;
      }
      pString += "\n ";
      if (i === 2 || i === 5) pString += " ------+-------+------\n ";
    }
    console.log(pString);
  }

  //Log a summary of the tests to the console.
  console.log(
    `\n\n${
      passedTests + failedTests
    } total tests run with ${passedTests} tests passing and ${failedTests} tests failing.`
  );

  return passedTests === 27 ? true : false; //All 27 tests must pass.
}

//the following statements run the test cases and display the returned values.
console.log(
  `\nOverall puzzle solution is ${validatePuzzle(puzzleArr1)}.\n\n\n`
);
console.log(
  `\nOverall puzzle solution is ${validatePuzzle(puzzleArr2)}.\n\n\n`
);
