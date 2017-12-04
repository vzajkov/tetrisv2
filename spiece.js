class sPiece {
  constructor() {
    this.columns = [4,5,5,6];
    this.rows = [1,0,1,0];
    this.rotatePosition = 0;
  }

  rotate() {
    switch (this.rotatePosition) {
      case 0 :
      this.columns.unshift(this.columns[0]);
        this.columns.pop();
        this.rows[0] = this.rows[0] - 2;
        this.rows[2] = this.rows[2] - 1;
        this.rows[3] = this.rows[3] + 1;
        this.rotatePosition = 1;
        break;
      case 1 :
        this.columns.shift();
        this.columns.push(this.columns.slice(-1)[0] + 1);
        this.rows[0] = this.rows[0] + 2;
        this.rows[2] = this.rows[2] + 1;
        this.rows[3] = this.rows[3] - 1;
        this.rotatePosition = 2;
        break;
      case 2 :
        this.columns.unshift(this.columns[0]);
        this.columns.pop();
        this.rows[0] = this.rows[0] - 2;
        this.rows[2] = this.rows[2] - 1;
        this.rows[3] = this.rows[3] + 1;
        this.rotatePosition = 3;
        break;
      case 3 :
        this.columns.shift();
        this.columns.push(this.columns.slice(-1)[0] + 1);
        this.rows[0] = this.rows[0] + 2;
        this.rows[2] = this.rows[2] + 1;
        this.rows[3] = this.rows[3] - 1;
        this.rotatePosition = 0;
        break;
    }

  }
}
