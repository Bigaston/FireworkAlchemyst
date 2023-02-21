package entity;

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

		var particleImg = hxd.Res.img.particle.Firework_01.toTile();
		var spriteBatch = new h2d.SpriteBatch(particleImg, this.parent);
		spriteBatch.hasUpdate = true;

		for (i in new StepIterator(0, 360, 16)) {
			var rad = Utils.degreesToRadians(Utils.random(i - 5, i + 5));

			var direction = new Vector2(Math.cos(rad), Math.sin(rad)).normalize();
			direction.x = direction.x * 4;
			direction.y = direction.y * 3;

			var particle = Type.createInstance(this.typeParticle, [particleImg, this.x, this.y, this.particleColor, direction, Utils.random(40, 75)]);

			spriteBatch.add(particle);

			rad = Utils.degreesToRadians(Utils.random(i - 5, i + 5));

			direction = new Vector2(Math.cos(rad), Math.sin(rad)).normalize();
			direction.x = direction.x * 2.5;
			direction.y = direction.y * 1.5;

			particle = Type.createInstance(this.typeParticle, [particleImg, this.x, this.y, this.particleColor, direction, Utils.random(40, 75)]);

			spriteBatch.add(particle);
		}

		cast(this.parent, scene.Scene).elements.remove(this);

		super.remove();
	}
}
