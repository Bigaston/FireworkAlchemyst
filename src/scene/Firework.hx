package scene;

class Firework extends scene.Scene {
	private static var colorTable:haxe.DynamicAccess<h3d.Vector> = {
		red: h3d.Vector.fromColor(0xd85d41),
		blue: h3d.Vector.fromColor(0x5ce4be),
		yellow: h3d.Vector.fromColor(0xfecd4a),
	}

	private var insideBowl = null;

	public function new(insideBowl:{
		?color:String,
		?type:String,
		?modifier:String
	}) {
		super();
		this.insideBowl = insideBowl;

		var globalInteractive = new h2d.Interactive(this.width, this.height, this);

		globalInteractive.onClick = function(e:hxd.Event) {
			var particle:Class<entity.Particle>;

			switch (this.insideBowl.modifier) {
				case "trail":
					particle = entity.TrailParticle;
				case "blink":
					particle = entity.BlinkParticle;

				default:
					particle = entity.Particle;
			}

			var firework:entity.Firework;

			var color:h3d.Vector;

			color = Firework.colorTable.get(this.insideBowl.color);
			if (color == null)
				color = h3d.Vector.fromColor(0xFFFFFF);

			switch (this.insideBowl.type) {
				case "circle":
					firework = new entity.CircleFirework(this, new Vector2(Utils.random(200, 400), 500),
						new Vector2(Utils.random(-10, 10), Utils.random(-15, -12)), Utils.random(30, 50), color, particle);
				case "normal":
					firework = new entity.Firework(this, new Vector2(Utils.random(200, 400), 500), new Vector2(Utils.random(-10, 10), Utils.random(-15, -12)),
						Utils.random(30, 50), color, particle);
				case "vertical":
					firework = new entity.VerticalFirework(this, new Vector2(Utils.random(200, 400), 500),
						new Vector2(Utils.random(-10, 10), Utils.random(-15, -12)), Utils.random(30, 50), color, particle);
				default:
					firework = new entity.BengalFirework(this, new Vector2(Utils.random(200, 400), 500),
						new Vector2(Utils.random(-10, 10), Utils.random(-15, -12)), Utils.random(30, 50), color, particle);
			}

			this.elements.push(firework);
		}
	}

	public function update(dt:Float) {
		for (elem in this.elements) {
			elem.updateEntity(dt);
		}
	}
}
