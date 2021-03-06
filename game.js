const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colors = ["#F7DC6F","#2471A3", "#2ECC71", "#EB984E", "#AF7AC5"];
let currentPiece = new lPiece();

class Game {
  constructor() {
    this.colors = colors;
    this.currentColor = this.colors[0];
    this.blockPositions = {
      0: [25],
      1: [25],
      2: [25],
      3: [25],
      4: [25],
      5: [25],
      6: [25],
      7: [25],
      8: [25],
      9: [25],
      10: [25],
      11: [25]
    };;
    this.highScores = [500, 1000,  5000,  10000, 25000];
    this.delay = 400;
    this.score = 0;
    this.startGame = false;
    this.pauseGame = false;
    this.gameOver = false;
    this.xShift = 0;
    this.rowHolder = [];
    this.checkStacked = this.checkStacked.bind(this);
    this.addtoStack = this.addtoStack.bind(this);
    this.updateFullRows = this.updateFullRows.bind(this);
    this.playGame = this.playGame.bind(this);
    this.postgameOver = this.postgameOver.bind(this);
  }

  drawDroppingBlock(cols, rows) {
    cols.forEach( (col, idx) => {
      ctx.fillStyle = this.currentColor;
      ctx.beginPath();
      ctx.moveTo(((col + this.xShift) * 25) + 1, (rows[idx] * 25));
      ctx.lineTo(((col + this.xShift) * 25) + 1, (rows[idx] * 25) + 24);
      ctx.lineTo(((col + this.xShift) * 25) + 23, (rows[idx] * 25) + 24);
      ctx.lineTo(((col + this.xShift) * 25) + 23, (rows[idx] * 25));
      ctx.lineTo(((col + this.xShift) * 25) + 1, (rows[idx] * 25));
      ctx.strokeStyle = "#ffffff";
      ctx.stroke();
      ctx.fillRect(((col + this.xShift) * 25) + 1, (rows[idx] * 25), 23, 23);
  });
}

  drawStackedBlocks() {
    Object.keys(this.blockPositions).forEach((x) => {
      return this.blockPositions[x].forEach((y) => {
        ctx.beginPath();
        ctx.moveTo((x * 25) + 1, (y * 25) - 24);
        ctx.lineTo((x * 25) + 1, (y * 25));
        ctx.lineTo((x * 25) + 23, (y * 25));
        ctx.lineTo((x * 25) + 23, (y * 25) - 24);
        ctx.lineTo((x * 25) + 1, (y * 25) - 24);
        ctx.strokeStyle = "#ffffff";
        ctx.stroke();
      });
    });
  }

  postgameOver() {
    if (this.gameOver === true) {
      ctx.clearRect(0,0, canvas.width, canvas.height);
      document.getElementById("game-over").innerHTML = "Game Over! Press any key to play again.";
      this.highScores.forEach( (highScore, idx) => {
        if (this.score > highScore - 10) {
          this.highScores[idx] = this.score - 10;
        }
      });
      document.getElementById("top-score").innerHTML = this.highScores[4];
      document.getElementById("second-score").innerHTML = this.highScores[3];
      document.getElementById("third-score").innerHTML = this.highScores[2];
      document.getElementById("fourth-score").innerHTML = this.highScores[1];
      document.getElementById("fifth-score").innerHTML = this.highScores[0];
    }
  }

  checkStacked(cols, rows) {
    //checks if the current falling block is stacked
    let xShift = this.xShift;
    let blockPos = this.blockPositions;
    let stacked = false;
    cols.forEach( (col, idx) => {
        if (blockPos[col + xShift].slice(-1)[0] === rows[idx] + 1) {
          stacked = true;
        }
      });
    return stacked;
  }

  randomPieceChooser() {
    let diceRoll = Math.floor(Math.random() * 6);
    switch (diceRoll) {
      case 0 :
        currentPiece = new lPiece();
        break;
      case 1 :
        currentPiece = new jPiece();
        break;
      case 2 :
        currentPiece = new sPiece();
        break;
      case 3 :
        currentPiece = new zPiece();
        break;
      case 4 :
        currentPiece = new tPiece();
        break;
      case 5 :
        currentPiece = new iPiece();
        break;
    }
    return currentPiece;
  }

  addtoStack(cols, rows) {
  //adds block to stacked blocks
  cols.forEach( (col, idx) => {
    this.blockPositions[col + this.xShift].push(rows[idx]);
    this.blockPositions[col + this.xShift].sort(function(a,b) {return b - a;});
    });
  }

  updateFullRows() {
    this.rowHolder = [];
    Object.values(this.blockPositions).forEach( (rowArray) => {
      rowArray.forEach( (row) => {
        if (Object.values(this.blockPositions).every( (array) => {
          return array.includes(row) && row !== 25 && !this.rowHolder.includes(row);
        })) {
          this.rowHolder.push(row);
        }
      });
    });
   return this.rowHolder;
  }

  dropRowsDown() {
    Object.keys(this.blockPositions).forEach( (col, idx) => {
      this.rowHolder.forEach( (fullRow) => {
        if (this.blockPositions[col].includes(fullRow)) {
          this.blockPositions[col].splice(this.blockPositions[col].indexOf(fullRow), 1);
          this.blockPositions[col].forEach((row) => {
            if (row < fullRow) {
              this.blockPositions[col][this.blockPositions[col].indexOf(row)]++;
            }
          });
        }
      });
    });
  }

  playGame(delay, columns, rows, color) {
    document.getElementById("score").innerHTML = this.score;
    //starting and pausing game
    if (this.startGame === true) {
      document.getElementById("press-start").innerHTML = "";
    }
    if (this.pauseGame === true) {
      document.getElementById("game-paused").innerHTML = "Game Paused";
    } else {
      document.getElementById("game-paused").innerHTML = "";
    }

    //clear canvas and begin new frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    Object.keys(this.blockPositions).forEach( (col) => {
      if (this.blockPositions[col].includes(0)) {
        this.gameOver = true;
        this.postgameOver();
      }
    });

    //draw out the blocks on canvas
    this.drawDroppingBlock(columns, rows);
    this.drawStackedBlocks();

    //if the block is stacked, add the block to stacked blocks, check for complete rows,
    //and then drop a new block down;
    if (this.checkStacked(columns, rows)) {
      this.addtoStack(columns, rows);
      this.updateFullRows();
      if (this.rowHolder.length > 0) {
        this.dropRowsDown();
      }
      this.currentColor = this.colors[Math.floor(Math.random() * this.colors.length)];
      currentPiece = this.randomPieceChooser();
      this.xShift = 0;
      return this.playGame(delay, currentPiece.columns, currentPiece.rows, this.currentColor);
    }

    if (this.pauseGame === false && this.gameOver === false) {
      this.score = this.score + 10;
      currentPiece.rows = currentPiece.rows.map((row) => { return row + 1;});
        setTimeout( () => {
          this.playGame(delay, currentPiece.columns, currentPiece.rows );
        }, this.delay);
    }
  }
}
