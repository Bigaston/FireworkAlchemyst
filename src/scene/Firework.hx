package scene;

class Firework extends scene.Scene {
	private static var colorTable:haxe.DynamicAccess<h3d.Vector> = {
		red: h3d.Vector.fromColor(0xd85d41),
		blue: h3d.Vector.fromColor(0x5ce4be),
		yellow: h3d.Vector.fromColor(0xfecd4a),
	}

	private var insideBowl = null;
	private var handClose:hxd.Cursor;
	private var handOpen:hxd.Cursor;

	public function new(insideBowl:{
		?color:String,
		?type:String,
		?modifier:String
	}) {
		handOpen = Custom(new hxd.Cursor.CustomCursor([hxd.Res.img.cursor.hand_open.toBitmap()], 0, 19, 23));
		handClose = Custom(new hxd.Cursor.CustomCursor([hxd.Res.img.cursor.hand_close.toBitmap()], 0, 19, 23));

		super();
		this.insideBowl = insideBowl;

		var globalInteractive = new h2d.Interactive(this.width, this.height, this);
		globalInteractive.cursor = handOpen;

		globalInteractive.onClick = function(e:hxd.Event) {
			var particle:Class<entity.Particle>;

			switch (this.insideBowl.modifier) {
				case "trail":
					particle = entity.TrailParticle;
				case "blink":
					particle = entity.BlinkParticle;

				default:
					particle = entity.Particle;
			}

			var firework:entity.Firework;

			var color:h3d.Vector;

			color = Firework.colorTable.get(this.insideBowl.color);
			if (color == null)
				color = h3d.Vector.fromColor(0xFFFFFF);

			switch (this.insideBowl.type) {
				case "circle":
					firework = new entity.CircleFirework(this, new Vector2(Utils.random(200, 400), 500),
						new Vector2(Utils.random(-10, 10), Utils.random(-12, -8)), Utils.random(30, 50), color, particle);
					Sound.playRandomSound([
						hxd.Res.sound.Tir.Canon_tir_leger_1,
						hxd.Res.sound.Tir.Canon_tir_leger_2,
						hxd.Res.sound.Tir.Canon_tir_lourd_1,
						hxd.Res.sound.Tir.Canon_tir_lourd_2
					]);

				case "cone":
					firework = new entity.Firework(this, new Vector2(Utils.random(200, 400), 500), new Vector2(Utils.random(-10, 10), Utils.random(-12, -8)),
						Utils.random(30, 50), color, particle);

					Sound.playRandomSound([
						hxd.Res.sound.Tir.Chandelle_tir_1,
						hxd.Res.sound.Tir.Chandelle_tir_2,
						hxd.Res.sound.Tir.Chandelle_tir_3,
						hxd.Res.sound.Tir.Chandelle_tir_4
					]);
					Sound.playRandomSound([
						hxd.Res.sound.Sifflements.Sifflement_chandelle_1,
						hxd.Res.sound.Sifflements.Sifflement_chandelle_2,
						hxd.Res.sound.Sifflements.Sifflement_chandelle_3,
						hxd.Res.sound.Sifflements.Sifflement_chandelle_4,
						hxd.Res.sound.Sifflements.Sifflement_chandelle_5,
						hxd.Res.sound.Sifflements.Sifflement_chandelle_6,
					]);
				case "vertical":
					firework = new entity.VerticalFirework(this, new Vector2(Utils.random(200, 400), 500),
						new Vector2(Utils.random(-10, 10), Utils.random(-12, -8)), Utils.random(30, 50), color, particle);

					Sound.playRandomSound([
						hxd.Res.sound.Tir.Chandelle_tir_1,
						hxd.Res.sound.Tir.Chandelle_tir_2,
						hxd.Res.sound.Tir.Chandelle_tir_3,
						hxd.Res.sound.Tir.Chandelle_tir_4
					]);
					Sound.playRandomSound([
						hxd.Res.sound.Sifflements.Sifflement_chandelle_1,
						hxd.Res.sound.Sifflements.Sifflement_chandelle_2,
						hxd.Res.sound.Sifflements.Sifflement_chandelle_3,
						hxd.Res.sound.Sifflements.Sifflement_chandelle_4,
						hxd.Res.sound.Sifflements.Sifflement_chandelle_5,
						hxd.Res.sound.Sifflements.Sifflement_chandelle_6,
					]);
				default:
					firework = new entity.BengalFirework(this, new Vector2(Utils.random(200, 400), 500), new Vector2(0, 0), Utils.random(30, 50), color,
						particle);

					Sound.playRandomSound([
						hxd.Res.sound.Crepitements.Chandelle_crepitement_long_leger_1,
						hxd.Res.sound.Crepitements.Chandelle_crepitement_long_leger_2,
						hxd.Res.sound.Crepitements.Chandelle_crepitement_lourd_1,
						hxd.Res.sound.Crepitements.Chandelle_crepitement_lourd_2,
						hxd.Res.sound.Crepitements.Chandelle_crepitement_short_leger_1,
						hxd.Res.sound.Crepitements.Chandelle_crepitement_short_leger_2,
					]);
			}

			this.elements.push(firework);
		}

		var arrowTile = hxd.Res.img.back_cursor.toTile();
		var arrowBitmap = new h2d.Bitmap(arrowTile, this);
		arrowBitmap.x = 20;
		arrowBitmap.y = 20;

		var arrowInteractive = new h2d.Interactive(arrowTile.width, arrowTile.height, arrowBitmap);
		arrowInteractive.cursor = handClose;

		arrowInteractive.onClick = function(e:hxd.Event):Void {
			var scene = new scene.Table();

			Game.instance.setScene(scene);
		}
	}

	public function update(dt:Float) {
		for (elem in this.elements) {
			elem.updateEntity(dt);
		}
	}
}
