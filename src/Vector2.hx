class Vector2 {
	public var x:Float;
	public var y:Float;

	public function new(x:Float, y:Float) {
		this.x = x;
		this.y = y;
	}

	public function add(v:Vector2):Vector2 {
		return new Vector2(this.x + v.x, this.y + v.y);
	}

	public function remove(v:Vector2):Vector2 {
		return new Vector2(this.x - v.x, this.y - v.y);
	}

	public function multiNumber(n:Float):Vector2 {
		return new Vector2(this.x * n, this.y * n);
	}

	public function magnitude():Float {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	public function normalize():Vector2 {
		var m = this.magnitude();
		return new Vector2(this.x / m, this.y / m);
	}
}
