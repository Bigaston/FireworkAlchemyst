export class Vector2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(other) {
    this.x = this.x + other.x;
    this.y = this.y + other.y;
  }

  remove(other) {
    this.x = this.x - other.x;
    this.y = this.y - other.y;
  }
}
