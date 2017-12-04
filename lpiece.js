class lPiece {
  constructor() {
    this.columns = [5,5,5,6];
    this.rows = [0,1,2,2];
    this.rotatePosition = 0;
    this.rotate = this.rotate.bind(this);
  }

  rotate() {
    let baseCol = this.columns[0];
    let baseRow = this.rows[0];
    switch (this.rotatePosition) {
      case 0 :
        this.columns[0] = this.columns[0] - 1;
        this.columns[1] = this.columns[1] - 1;
        this.rows[0] = this.rows[0] + 1;
        this.rows[1] = this.rows[1] + 1;
        this.rows[2] = this.rows[2] - 1;
        this.rows[3] = this.rows[3] - 1;
        this.rotatePosition = 1;
        break;
      case 1 :
        this.columns = [baseCol, baseCol + 1, baseCol + 1, baseCol + 1];
        this.rows = [baseRow - 1, baseRow - 1, baseRow, baseRow + 1];
        this.rotatePosition = 2;
        break;
      case 2 :
        this.columns = [baseCol, baseCol + 1, baseCol + 2, baseCol + 2];
        this.rows = [baseRow + 2, baseRow + 2, baseRow + 1, baseRow + 2];
        this.rotatePosition = 3;
        break;
      case 3 :
        this.columns = [baseCol + 1, baseCol + 1, baseCol + 1, baseCol + 2];
        this.rows = [baseRow - 2, baseRow - 1, baseRow, baseRow];
        this.rotatePosition = 0;
        break;
    }
  }
}
