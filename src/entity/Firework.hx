package entity;

import h2d.Bitmap;

class Firework extends Bitmap implements entity.Entity {
	public var direction:Vector2;
	public var timeBeforeExplosion:Float;
	public var typeParticle:Class<entity.Particle>;

	public var particleColor:h3d.Vector;

	public var minDirection:Vector2;
	public var maxDirection:Vector2;

	public function new(parent:h2d.Object, position:Vector2, direction:Vector2, timeBeforeExplosion:Float, color:h3d.Vector,
			?typeParticle:Class<entity.Particle>) {
		super(hxd.Res.img.particle.Firework_01.toTile(), parent);

		this.x = position.x;
		this.y = position.y;

		this.direction = direction;
		this.timeBeforeExplosion = timeBeforeExplosion;
		this.typeParticle = typeParticle;

		this.particleColor = h3d.Vector.fromArray([color.r, color.g, color.b, color.a]);

		// this.color.r = color.r;
		// this.color.g = color.g;
		// this.color.b = color.b;
		// this.color.a = color.a;

		// this.color = h3d.Vector.fromColor(0xFF0000);

		this.minDirection = new Vector2(-5, -50);
		this.maxDirection = new Vector2(5, 5);
	};

	public function detonate() {
		// if (this.typeParticle.hasField("playParticleSound")) {
		// 	this.typeParticle.playParticleSound();
		// }

		var particleImg = hxd.Res.img.particle.Firework_01.toTile();
		var spriteBatch = new h2d.SpriteBatch(particleImg, this.parent);
		spriteBatch.hasUpdate = true;

		for (i in 0...50) {
			var xDirection = Utils.random(-10, 10);
			var yDirection = Utils.random(-7, -3);

			var direction = new Vector2(xDirection, yDirection).normalize();
			direction = direction.multiNumber(Utils.random(1, 7));

			var particle = Type.createInstance(this.typeParticle, [
				particleImg,
				this.x,
				this.y,
				this.particleColor,
				new Vector2(2, 2),
				direction,
				Utils.random(40, 75)
			]);

			spriteBatch.add(particle);
		}

		cast(this.parent, scene.Scene).elements.remove(this);
		super.remove();
	}

	public function updateEntity(dt:Float):Void {
		this.timeBeforeExplosion -= 1;

		this.direction.x *= 0.98;
		this.direction.y += 0.15;

		if (this.direction.y > this.maxDirection.y)
			this.direction.y = this.maxDirection.y;

		this.x += this.direction.x;
		this.y += this.direction.y;

		if (this.timeBeforeExplosion <= 0) {
			this.detonate();
		}
	}
}