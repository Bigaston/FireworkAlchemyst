package entity;

import h2d.Tile;

class BengalFirework extends entity.Firework {
	private var frameSinceBlew = 0.0;
	private var frameBetweenBlew = 2.0;
	private var frameBetweenSound = 10.0;
	private var frameSinceSound = 0.0;
	private var spriteBatch:h2d.SpriteBatch;
	private var particleTile:Array<Tile> = [];

	public function new(parent:h2d.Object, position:Vector2, direction:Vector2, timeBeforeExplosion:Float, color:h3d.Vector,
			?typeParticle:Class<entity.Particle>) {
		super(parent, position, direction, timeBeforeExplosion, color, typeParticle);

		var particleTexture = hxd.Res.img.particle.particle.toTexture();
		this.particleTile[0] = Tile.fromTexture(particleTexture);
		this.particleTile[0].setPosition(0, 0);
		this.particleTile[0].setSize(9, 9);

		this.particleTile[1] = Tile.fromTexture(particleTexture);
		this.particleTile[1].setPosition(9, 0);
		this.particleTile[1].setSize(9, 9);

		this.particleTile[2] = Tile.fromTexture(particleTexture);
		this.particleTile[2].setPosition(18, 0);
		this.particleTile[2].setSize(9, 9);

		spriteBatch = new h2d.SpriteBatch(this.particleTile[0], this.parent);
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

		if (this.frameSinceSound >= this.frameBetweenSound) {
			this.frameSinceSound = 0;

			Sound.playRandomSound([
				hxd.Res.sound.Crepitements.Chandelle_crepitement_long_leger_1,
				hxd.Res.sound.Crepitements.Chandelle_crepitement_long_leger_2,
				hxd.Res.sound.Crepitements.Chandelle_crepitement_lourd_1,
				hxd.Res.sound.Crepitements.Chandelle_crepitement_lourd_2,
				hxd.Res.sound.Crepitements.Chandelle_crepitement_short_leger_1,
				hxd.Res.sound.Crepitements.Chandelle_crepitement_short_leger_2,
			]);
		}

		if (this.frameSinceBlew >= this.frameBetweenBlew) {
			this.frameSinceBlew = 0;

			for (i in 0...10) {
				var rad = Utils.degreesToRadians(Utils.random(240, 300));

				var direction = new Vector2(Math.cos(rad), Math.sin(rad)).normalize();
				direction.x = direction.x * Utils.random(1, 3);
				direction.y = direction.y * Utils.random(2, 4);

				var particle = Type.createInstance(this.typeParticle, [
					this.particleTile[Utils.randomInt(0, 3)],
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
