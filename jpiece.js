class jPiece {
  constructor() {
    this.columns = [4,5,5,5];
    this.rows = [2,0,1,2];
    this.rotatePosition = 0;
  }

  rotate() {
    switch (this.rotatePosition) {
      case 0 :
        this.columns[1] = this.columns[1] - 1;
        this.columns[3] = this.columns[3] + 1;
        this.rows[0] = this.rows[0] - 1;
        this.rows[1] = this.rows[1] + 2;
        this.rows[2] = this.rows[2] + 1;
        this.rotatePosition = 1;
        break;
      case 1 :
        this.columns[2] = this.columns[2] - 1;
        this.columns[3] = this.columns[3] - 1;
        this.rows[0] = this.rows[0] - 1;
        this.rows[1] = this.rows[1] - 1;
        this.rows[3] = this.rows[3] - 2;
        this.rotatePosition = 2;
        break;
      case 2 :
        this.columns[1] = this.columns[1] + 1;
        this.columns[2] = this.columns[2] + 2;
        this.columns[3] = this.columns[3] + 1;
        this.rows[0] = this.rows[0] + 1;
        this.rows[2] = this.rows[2] - 1;
        this.rows[3] = this.rows[3] + 2;
        this.rotatePosition = 3;
        break;
      case 3 :
        this.columns[2] = this.columns[2] - 1;
        this.columns[3] = this.columns[3] - 1;
        this.rows[0] = this.rows[0] + 1;
        this.rows[1] = this.rows[1] - 1;
        this.rotatePosition = 0;
        break;
    }

  }
}
