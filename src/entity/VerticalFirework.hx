package entity;

class VerticalFirework extends entity.Firework {
	public function new(parent:h2d.Object, position:Vector2, direction:Vector2, timeBeforeExplosion:Float, color:h3d.Vector,
			?typeParticle:Class<entity.Particle>) {
		super(parent, position, direction, timeBeforeExplosion, color, typeParticle);
	}

	override public function detonate() {
		Reflect.callMethod(CircleFirework, Reflect.field(this.typeParticle, "playParticleSound"), []);

		hxd.Res.sound.Explosions.Chandelle_explosion_1.play();

		var particleImg = hxd.Res.img.particle.Firework_01.toTile();
		var spriteBatch = new h2d.SpriteBatch(particleImg, this.parent);
		spriteBatch.hasUpdate = true;

		for (i in 0...50) {
			var rad = Utils.degreesToRadians(Utils.random(240, 300));

			var direction = new Vector2(Math.cos(rad), Math.sin(rad)).normalize();

			direction = direction.multiNumber(Utils.random(1, 6));

			var particle = Type.createInstance(this.typeParticle, [particleImg, this.x, this.y, this.particleColor, direction, Utils.random(40, 75)]);

			spriteBatch.add(particle);
		}

		cast(this.parent, scene.Scene).elements.remove(this);

		super.remove();
	}
}
