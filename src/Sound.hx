class Sound {
	public static function playRandomSound(sounds:Array<hxd.res.Sound>) {
		var random = Math.round(Utils.random(0, sounds.length - 1));
		trace(random, sounds.length);
		sounds[random].play();
	}
}
