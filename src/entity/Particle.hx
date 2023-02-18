package entity;

class Particle extends h2d.SpriteBatch.BatchElement {
	public var color:h3d.Vector;
	public var size:Vector2;
	public var direction:Vector2;
	public var lifetime:Float;

	public var minDirection:Vector2;
	public var maxDirection:Vector2;

	public function new(tile:h2d.Tile, x:Float, y:Float, color:h3d.Vector, size:Vector2, direction:Vector2, lifetime:Float) {
		super(tile);

		this.x = x;
		this.y = y;

		this.r = color.r;
		this.g = color.g;
		this.b = color.b;
		this.a = color.a;

		this.size = size;
		this.direction = direction;
		this.lifetime = lifetime;

		this.minDirection = new Vector2(0, -20);
		this.maxDirection = new Vector2(5, 9);
	}

	override private function update(dt:Float):Bool {
		this.lifetime--;

		this.direction.x *= 0.98;
		this.direction.y += 0.10;

		if (this.direction.y < this.minDirection.y)
			this.direction.y = this.minDirection.y;
		if (this.direction.y > this.maxDirection.y)
			this.direction.y = this.maxDirection.y;

		this.x += this.direction.x;
		this.y += this.direction.y;

		return this.lifetime >= 0;
	}
}