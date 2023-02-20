package scene;

import entity.BlinkParticle;
import entity.TrailParticle;

class Firework extends scene.Scene {
	private static var colorTable = {
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
					particle = TrailParticle;
				case "blink":
					particle = BlinkParticle;

				default:
					particle = entity.Particle;
			}

			var firework:Firework;

			switch (this.insideBowl.type) {
				case "circle":
					firework = new entity.CircleFirework(this, new Vector2(Utils.random(200, 400), 500),
						new Vector2(Utils.random(-10, 10), Utils.random(-15, -12)),
						Utils.random(30, 50), Firework.colorTable.get(this.insideBowl.color) || h3d.Vector.fromColor(0xFFFFFF), particle);
			}

			var firework = new entity.Firework(this, new Vector2(this.width / 2, this.height), new Vector2(-4, -8), 50, h3d.Vector.fromColor(0xFF0000),
				entity.TrailParticle);

			this.elements.push(firework);
		}
	}

	public function update(dt:Float) {
		for (elem in this.elements) {
			elem.updateEntity(dt);
		}
	}
}
