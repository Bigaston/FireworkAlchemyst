class Game extends hxd.App {
	// Public
	public static var instance:Game;

	static function main() {
		instance = new Game();
	}

	// Instance
	override function init() {
		#if js
		hxd.Res.initEmbed({
			compressSounds: true
		});
		#else
		hxd.res.Resource.LIVE_UPDATE = true;
		hxd.Res.initLocal();
		#end

		var table = new scene.Table();
		setScene(table);
	}

	override function update(dt:Float) {
		super.update(dt);

		if (s2d is scene.Scene) {
			cast(s2d, scene.Scene).update(dt);
		}
	}
}
