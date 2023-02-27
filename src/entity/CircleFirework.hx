package entity;

import h2d.Tile;

class CircleFirework extends entity.Firework {
	public function new(parent:h2d.Object, position:Vector2, direction:Vector2, timeBeforeExplosion:Float, color:h3d.Vector,
			?typeParticle:Class<entity.Particle>) {
		super(parent, position, direction, timeBeforeExplosion, color, typeParticle);
	}

	override public function detonate() {
		Sound.playRandomSound([
			hxd.Res.sound.Explosions.Canon_explosion_legere_1,
			hxd.Res.sound.Explosions.Canon_explosion_legere_2,
			hxd.Res.sound.Explosions.Canon_explosion_lourde_1
		]);

		Reflect.callMethod(CircleFirework, Reflect.field(this.typeParticle, "playParticleSound"), []);

		var particleTexture = hxd.Res.img.particle.particle.toTexture();
		var particleTile:Array<Tile> = [];
		particleTile[0] = Tile.fromTexture(particleTexture);
		particleTile[0].setPosition(0, 0);
		particleTile[0].setSize(9, 9);

		particleTile[1] = Tile.fromTexture(particleTexture);
		particleTile[1].setPosition(9, 0);
		particleTile[1].setSize(9, 9);

		particleTile[2] = Tile.fromTexture(particleTexture);
		particleTile[2].setPosition(18, 0);
		particleTile[2].setSize(9, 9);

		var spriteBatch = new h2d.SpriteBatch(particleTile[0], this.parent);
		spriteBatch.hasUpdate = true;

		for (i in new StepIterator(0, 360, 16)) {
			var rad = Utils.degreesToRadians(Utils.random(i - 5, i + 5));

			var direction = new Vector2(Math.cos(rad), Math.sin(rad)).normalize();
			direction.x = direction.x * 4;
			direction.y = direction.y * 3;

			var particle = Type.createInstance(this.typeParticle, [
				particleTile[Utils.randomInt(0, 3)],
				this.x,
				this.y,
				this.particleColor,
				direction,
				Utils.random(40, 75)
			]);

			spriteBatch.add(particle);

			rad = Utils.degreesToRadians(Utils.random(i - 5, i + 5));

			direction = new Vector2(Math.cos(rad), Math.sin(rad)).normalize();
			direction.x = direction.x * 2.5;
			direction.y = direction.y * 1.5;

			particle = Type.createInstance(this.typeParticle, [
				particleTile[Utils.randomInt(0, 3)],
				this.x,
				this.y,
				this.particleColor,
				direction,
				Utils.random(40, 75)
			]);

			spriteBatch.add(particle);
		}

		cast(this.parent, scene.Scene).elements.remove(this);

		super.remove();
	}
}
