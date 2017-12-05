let currentGame = new Game();

const intersectionCheck = (bigArr, smallArr) => {
  let seen = {};
  let intersect = false;

  bigArr.forEach( (elem) => {
    seen[elem] = true;
  });

  smallArr.forEach( (elem) => {
    if (seen[elem]) {
      intersect = true;
    }
  });

  return intersect;
};

document.addEventListener('DOMContentLoaded', () => {
  currentGame.startGame = true;
  currentGame.playGame(currentGame.delay,
     currentPiece.columns,
     currentPiece.rows,
     currentGame.currentColor
    );
});

document.addEventListener('keypress', (e) => {
  // if (gameOver === true) {
  //   let currentGame = new Game();
  //   let currentPiece = new lPiece();
  //   document.getElementById("game-over").innerHTML = "";
  //   return currentGame.playGame(currentGame.delay, currentPiece.columns, currentPiece.rows, currentGame.currentColor );
  // }
  // if (startGame === false) {
  //   startGame = true;
  //   return sinkBlocks(delay, cols, rows, currentColor);
  // }
  let rows;
  let stackedRows;
  switch (e.key) {
    case "a" :
      stackedRows = [];
      currentPiece.columns.forEach((col) => {
        stackedRows = stackedRows.concat(
          currentGame.blockPositions[col + currentGame.xShift - 1]);
      });
      rows = currentPiece.rows;
      if (currentPiece.columns.every((col) => {
        return col + currentGame.xShift > 0 &&
        !intersectionCheck(stackedRows, rows) &&
        !intersectionCheck(stackedRows, rows.map(row => row - 1));
      })) {
        currentGame.xShift = currentGame.xShift - 1;
      }
      break;
    case "d" :
      stackedRows = [];
      currentPiece.columns.forEach((col) => {
        stackedRows = stackedRows.concat(
          currentGame.blockPositions[col + currentGame.xShift + 1]);
      });
      rows = currentPiece.rows;
      if (currentPiece.columns.every((col) => {
        return col + currentGame.xShift < 11 &&
        !intersectionCheck(stackedRows, rows) &&
        !intersectionCheck(stackedRows, rows.map(row => row - 1));
      })) {
        currentGame.xShift = currentGame.xShift + 1;
      }

      break;
    case "r" :
      currentPiece.rotate();
      break;
  }

});
