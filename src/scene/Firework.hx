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
			var firework = new entity.Firework(this, new Vector2(this.width / 2, this.height), new Vector2(-4, -8), 30, new h3d.Vector(1, 1, 1, 1),
				entity.Particle);

			this.elements.push(firework);
		}
	}

	public function update(dt:Float) {
		for (elem in this.elements) {
			elem.updateEntity(dt);
		}
	}
}
