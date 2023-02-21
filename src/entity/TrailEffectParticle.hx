package entity;

class TrailEffectParticle extends entity.Particle {
	public function new(tile:h2d.Tile, x:Float, y:Float, lifetime:Float) {
		super(tile, x, y, h3d.Vector.fromColor(0x85929E), new Vector2(0, 0), lifetime);
		this.a = 0.2;
	}
}
