class Game extends hxd.App {
	override function init() {
		#if js
		hxd.Res.initEmbed({compressSounds: true});
		#else
		hxd.res.Resource.LIVE_UPDATE = true;
		hxd.Res.initLocal();
		#end

		instance = new Game();
	}

	public static var instance:Game;

	static function main() {
		instance = new Game();
	}
}
