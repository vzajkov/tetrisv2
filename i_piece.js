class iPiece {
  constructor() {
    this.columns = [3,4,5,6];
    this.rows = [0,0,0,0];
    this.rotatePosition = 0;
  }

  rotate() {
    switch (this.rotatePosition) {
      case 0 :
        for (let i=0; i < 4; i++) {
          this.columns[i] = this.columns[0];
          this.rows[i] = this.rows[0] + i;
        }
        this.rotatePosition = 1;
        break;
      case 1 :
        for (let i=0; i < 4; i++) {
          this.rows[i] = this.rows[0];
          this.columns[i] = this.columns[0] + i;
        }
        this.rotatePosition = 2;
        break;
      case 2 :
        for (let i=0; i < 4; i++) {
          this.columns[i] = this.columns[0];
          this.rows[i] = this.rows[0] + i;
        }
        this.rotatePosition = 3;
        break;
      case 3 :
        for (let i=0; i < 4; i++) {
          this.rows[i] = this.rows[0];
          this.columns[i] = this.columns[0] + i;
        }
        this.rotatePosition = 0;
        break;
    }

  }
}
