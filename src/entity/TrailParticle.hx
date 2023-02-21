package entity;

class TrailParticle extends entity.Particle {
	private var frameUntilSpawn = 0.0;
	private var frameBetweenSpawn = 0.0;
	private var trailDuration = 10.0;

	public function new(tile:h2d.Tile, x:Float, y:Float, color:h3d.Vector, direction:Vector2, lifetime:Float) {
		super(tile, x, y, color, direction, lifetime);
	}

	override private function update(dt:Float):Bool {
		this.frameUntilSpawn -= dt;

		if (this.frameUntilSpawn <= 0) {
			this.frameUntilSpawn = this.frameBetweenSpawn;

			var particle = new entity.TrailEffectParticle(this.t, this.x, this.y, this.trailDuration);

			this.batch.add(particle);
		}

		return super.update(dt);
	}
}
