package entity;

class BlinkParticle extends entity.Particle {
	private var frameUntilStartBlink = Utils.random(2, 6);
	private var frameBetweenBlink = 4.0;
	private var frameSinceBlink = 0.0;
	private var blink = false;

	public function new(tile:h2d.Tile, x:Float, y:Float, color:h3d.Vector, direction:Vector2, lifetime:Float) {
		super(tile, x, y, color, direction, lifetime);
	}

	public static function playParticleSound() {
		Sound.playRandomSound([
			hxd.Res.sound.Crepitements.Chandelle_crepitement_long_leger_1,
			hxd.Res.sound.Crepitements.Chandelle_crepitement_long_leger_2,
			hxd.Res.sound.Crepitements.Chandelle_crepitement_lourd_1,
			hxd.Res.sound.Crepitements.Chandelle_crepitement_lourd_2,
			hxd.Res.sound.Crepitements.Chandelle_crepitement_short_leger_1,
			hxd.Res.sound.Crepitements.Chandelle_crepitement_short_leger_2,
		]);
	}

	override private function update(dt:Float):Bool {
		if (this.frameUntilStartBlink > 0) {
			this.frameUntilStartBlink -= hxd.Timer.tmod;
		} else {
			this.frameSinceBlink += hxd.Timer.tmod;

			if (this.frameSinceBlink >= this.frameBetweenBlink) {
				this.frameSinceBlink = 0;

				this.blink = !this.blink;

				if (this.blink) {
					this.a = 1;
				} else {
					this.a = 0;
				}
			}
		}

		return super.update(dt);
	}
}
