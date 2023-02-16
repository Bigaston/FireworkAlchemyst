package entity;

import h2d.Bitmap;

class Firework extends Bitmap implements entity.Entity {
	public var direction:Vector2;
	public var timeBeforeExplosion:Float;
	public var typeParticle:Class<entity.Particle>;

	public var minDirection:Vector2;
	public var maxDirection:Vector2;

	public function new(parent:h2d.Object, position:Vector2, direction:Vector2, timeBeforeExplosion:Float, color:h3d.Vector,
			?typeParticle:Class<entity.Particle>) {
		super(hxd.Res.img.particle.Firework_01.toTile(), parent);

		this.x = position.x;
		this.y = position.y;

		this.direction = direction;
		this.timeBeforeExplosion = timeBeforeExplosion;
		this.color = color; // Inherited from h2d.Bitmap
		this.typeParticle = typeParticle;

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
			var xDirection = Utils.random(-5, 5);
			var yDirection = Utils.random(-7, -3);

			var particle = Type.createInstance(this.typeParticle, [
				particleImg,
				this.x,
				this.y,
				this.color,
				new Vector2(2, 2),
				new Vector2(xDirection, yDirection),
				xDirection < 0 ? new Vector2(0.1, 0.2) : xDirection > 0 ? new Vector2(-0.1, 0.2) : new Vector2(0, 0.2),
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
		this.direction.y += 0.10;

		if (this.direction.y > this.maxDirection.y)
			this.direction.y = this.maxDirection.y;

		this.x += this.direction.x;
		this.y += this.direction.y;

		if (this.timeBeforeExplosion <= 0) {
			this.detonate();
		}
	}
}
