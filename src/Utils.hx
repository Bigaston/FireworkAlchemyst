class Utils {
	public static function random(min:Float, max:Float):Float {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	public static function degreesToRadians(degrees:Float):Float {
		return degrees * Math.PI / 180;
	}
}
