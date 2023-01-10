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

  multiNumber(number) {
    this.x = this.x * number;
    this.y = this.y * number;
  }

  copy() {
    return new Vector2(this.x, this.y);
  }

  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize() {
    var mag = this.magnitude();
    return new Vector(this.x / mag, this.y / mag);
  }
}
