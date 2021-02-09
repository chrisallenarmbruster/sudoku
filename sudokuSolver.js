//Test Data
let testPuzzle = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

let testSolution = [
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

let testPuzzle2 = [
  [0, 0, 0, 1, 0, 0, 6, 0, 5],
  [0, 0, 0, 0, 0, 6, 0, 0, 0],
  [0, 0, 2, 5, 0, 9, 0, 3, 0],
  [9, 0, 0, 0, 7, 0, 0, 6, 0],
  [2, 0, 0, 0, 3, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 3, 0, 2],
  [7, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 4, 0, 0, 0, 0, 0, 2, 0],
  [0, 0, 1, 0, 6, 5, 4, 0, 0],
];

let testSolution2 = [
  [4, 7, 9, 1, 2, 3, 6, 8, 5],
  [5, 3, 8, 7, 4, 6, 2, 1, 9],
  [1, 6, 2, 5, 8, 9, 7, 3, 4],
  [9, 1, 3, 4, 7, 2, 5, 6, 8],
  [2, 5, 4, 6, 3, 8, 1, 9, 7],
  [6, 8, 7, 9, 5, 1, 3, 4, 2],
  [7, 2, 6, 3, 9, 4, 8, 5, 1],
  [3, 4, 5, 8, 1, 7, 9, 2, 6],
  [8, 9, 1, 2, 6, 5, 4, 7, 3],
];

//edit the arrary below to test your puzzle
let emptyPuzzle1 = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

//Main function
function sudoku(puzzle) {
  //Test logging
  let blankCells = saveBlankCells(puzzle);
  console.log(solve(puzzle, blankCells));

  //Create a array of the blank cells - will iterate through these when solving the puzzle
  function saveBlankCells(puzzle) {
    let blankCells = [];
    for (let i = 0; i < puzzle.length; i++) {
      for (let j = 0; j < puzzle[i].length; j++) {
        if (puzzle[i][j] === 0) blankCells.push([i, j]);
      }
    }
    return blankCells; //return array of empty positions
  }

  //This function iterates through the blank cells, tries solutions and backtracks when failing.
  function solve(puzzle, blankCells) {
    let limit = 9;
    let i = 0,
      row,
      column,
      value,
      found;
    while (i < blankCells.length) {
      row = blankCells[i][0];
      column = blankCells[i][1];
      value = puzzle[row][column] + 1;
      found = false;
      while (!found && value <= limit) {
        if (testValue(puzzle, column, row, value)) {
          found = true;
          puzzle[row][column] = value;
          i++;
        } else {
          value++;
        }
      }
      if (!found) {
        puzzle[row][column] = 0;
        i--;
      }
    }
    return puzzle;
  }

  //This function checks to see if a number has already been used in a row, column or square
  function testValue(puzzle, column, row, value) {
    if (
      testRow(puzzle, row, value) &&
      testColumn(puzzle, column, value) &&
      testSquare(puzzle, column, row, value)
    ) {
      return true;
    } else {
      return false;
    }

    function testRow(puzzle, row, value) {
      for (let i = 0; i < puzzle[row].length; i++) {
        if (puzzle[row][i] === value) return false;
      }
      return true;
    }

    function testColumn(puzzle, column, value) {
      for (let i = 0; i < puzzle.length; i++) {
        if (puzzle[i][column] === value) return false;
      }
      return true;
    }

    function testSquare(puzzle, column, row, value) {
      let columnCorner = 0;
      let rowCorner = 0;
      let squareSize = 3;

      while (column >= columnCorner + squareSize) {
        columnCorner += squareSize;
      }

      while (row >= rowCorner + squareSize) {
        rowCorner += squareSize;
      }

      for (let i = rowCorner; i < rowCorner + squareSize; i++) {
        for (var j = columnCorner; j < columnCorner + squareSize; j++) {
          if (puzzle[i][j] === value) return false;
        }
      }
      return true;
    }
  }
}

return sudoku(testPuzzle2);
