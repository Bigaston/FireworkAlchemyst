package scene;

class Firework extends scene.Scene {
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
			var firework = new entity.CircleFirework(this, new Vector2(this.width / 2, this.height), new Vector2(-4, -8), 50, h3d.Vector.fromColor(0xFF0000),
				entity.Particle);

			// firework.color = h3d.Vector.fromColor(0xFF0000);

			this.elements.push(firework);
		}
	}

	public function update(dt:Float) {
		for (elem in this.elements) {
			elem.updateEntity(dt);
		}
	}
}
