class Sound {
	public static function playRandomSound(sounds:Array<hxd.res.Sound>) {
		var random = Utils.randomInt(0, sounds.length - 1);
		sounds[random].play();
	}
}
