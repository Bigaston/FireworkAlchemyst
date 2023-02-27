package entity;

import h2d.Tile;
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
		Reflect.callMethod(CircleFirework, Reflect.field(this.typeParticle, "playParticleSound"), []);

		hxd.Res.sound.Explosions.Chandelle_explosion_1.play();

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

		for (i in 0...50) {
			var rad = Utils.degreesToRadians(Utils.random(200, 340));

			var direction = new Vector2(Math.cos(rad), Math.sin(rad)).normalize();

			direction = direction.multiNumber(Utils.random(1, 7));

			var particle = Type.createInstance(this.typeParticle, [
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

	public function updateEntity(dt:Float):Void {
		this.timeBeforeExplosion -= hxd.Timer.tmod;

		this.direction.x *= Math.pow(0.98, hxd.Timer.tmod);
		this.direction.y += 0.15 * hxd.Timer.tmod;

		if (this.direction.y > this.maxDirection.y)
			this.direction.y = this.maxDirection.y;

		this.x += this.direction.x * hxd.Timer.tmod;
		this.y += this.direction.y * hxd.Timer.tmod;

		if (this.timeBeforeExplosion <= 0) {
			this.detonate();
		}
	}
}
