package entity;

class TrailParticle extends entity.Particle {
	private var frameUntilSpawn = 0.0;
	private var frameBetweenSpawn = 0.0;
	private var trailDuration = 10.0;

	private var trailTile:h2d.Tile;

	public static function playParticleSound() {
		Sound.playRandomSound([
			hxd.Res.sound.Crepitements.Chandelle_crepitement_long_leger_1,
			hxd.Res.sound.Crepitements.Chandelle_crepitement_long_leger_2,
			hxd.Res.sound.Crepitements.Chandelle_crepitement_lourd_1,
			hxd.Res.sound.Crepitements.Chandelle_crepitement_lourd_2,
			hxd.Res.sound.Crepitements.Chandelle_crepitement_short_leger_1,
			hxd.Res.sound.Crepitements.Chandelle_crepitement_short_leger_2,
		]);
	}

	public function new(tile:h2d.Tile, x:Float, y:Float, color:h3d.Vector, direction:Vector2, lifetime:Float) {
		super(tile, x, y, color, direction, lifetime);

		this.trailTile = h2d.Tile.fromTexture(tile.getTexture());
		this.trailTile.setSize(9, 9);
		this.trailTile.setPosition(9, 0);
	}

	override private function update(dt:Float):Bool {
		this.frameUntilSpawn -= dt;

		if (this.frameUntilSpawn <= 0) {
			this.frameUntilSpawn = this.frameBetweenSpawn;

			var particle = new entity.TrailEffectParticle(this.trailTile, this.x, this.y, this.trailDuration);

			this.batch.add(particle);
		}

		return super.update(dt);
	}
}
