class zPiece {
  constructor() {
    this.columns = [4,5,5,6];
    this.rows = [0,0,1,1];
    this.rotatePosition = 0;
    this.rotate = this.rotate.bind(this);
  }

  rotate() {
    let baseCol = this.columns[0];
    let baseRow = this.rows[0];
    switch (this.rotatePosition) {
      case 0 :
        this.columns = [baseCol, baseCol, baseCol + 1, baseCol + 1];
        this.rows = [baseRow, baseRow + 1, baseRow - 1, baseRow];
        break;
      case 1 :
        this.columns = [baseCol, baseCol + 1, baseCol + 1, baseCol + 2];
        this.rows = [baseRow, baseRow, baseRow + 1, baseRow + 1];
        this.rotatePosition = 2;
        break;
      case 2 :
        this.columns = [baseCol, baseCol, baseCol + 1, baseCol + 1];
        this.rows = [baseRow, baseRow + 1, baseRow - 1, baseRow];
        this.rotatePosition = 3;
        break;
      case 3 :
        this.columns = [baseCol, baseCol + 1, baseCol + 1, baseCol + 2];
        this.rows = [baseRow, baseRow, baseRow + 1, baseRow + 1];
        this.rotatePosition = 0;
        break;
    }
  }
}
