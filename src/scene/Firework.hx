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
	}

	public function update(dt:Float) {}
}
