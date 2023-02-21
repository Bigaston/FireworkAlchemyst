package entity;

class BengalFirework extends entity.Firework {
	private var frameSinceBlew = 0.0;
	private var frameBetweenBlew = 2.0;
	private var frameBetweenSound = 10.0;
	private var frameSinceSound = 0.0;
	private var particleImg:h2d.Tile;
	private var spriteBatch:h2d.SpriteBatch;

	public function new(parent:h2d.Object, position:Vector2, direction:Vector2, timeBeforeExplosion:Float, color:h3d.Vector,
			?typeParticle:Class<entity.Particle>) {
		super(parent, position, direction, timeBeforeExplosion, color, typeParticle);

		particleImg = hxd.Res.img.particle.Firework_01.toTile();
		spriteBatch = new h2d.SpriteBatch(particleImg, this.parent);
		spriteBatch.hasUpdate = true;
	}

	override public function detonate() {
		cast(this.parent, scene.Scene).elements.remove(this);

		super.remove();
	}

	override public function updateEntity(dt:Float) {
		this.timeBeforeExplosion -= hxd.Timer.tmod;
		this.frameSinceBlew += hxd.Timer.tmod;
		this.frameSinceSound += hxd.Timer.tmod;

		if (this.frameSinceBlew >= this.frameBetweenBlew) {
			this.frameSinceBlew = 0;

			for (i in 0...10) {
				var rad = Utils.degreesToRadians(Utils.random(240, 300));

				var direction = new Vector2(Math.cos(rad), Math.sin(rad)).normalize();
				direction.x = direction.x * Utils.random(1, 3);
				direction.y = direction.y * Utils.random(2, 4);

				var particle = Type.createInstance(this.typeParticle, [
					this.particleImg,
					this.x,
					this.y,
					this.particleColor,
					direction,
					Utils.random(40, 75)
				]);

				this.spriteBatch.add(particle);
			}
		}

		if (this.timeBeforeExplosion <= 0) {
			this.detonate();
		}
	}
}
