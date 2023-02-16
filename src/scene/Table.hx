package scene;

class Table extends scene.Scene {
	private var insideBowl = {color: null, type: null, modifier: null};

	private var lighterBitmap:h2d.Bitmap;
	private var binBitmap:h2d.Bitmap;
	private var bowlBitmap:h2d.Bitmap;
	private var bowlContentPowderBitmap:h2d.Bitmap;
	private var bowlContentTypeBitmap:h2d.Bitmap;
	private var bowlContentModifierBitmap:h2d.Bitmap;

	private var handClose:hxd.Cursor;
	private var handOpen:hxd.Cursor;
	private var emptyTile:h2d.Tile;

	public function new() {
		super();

		// Create custom cursors
		handOpen = Custom(new hxd.Cursor.CustomCursor([hxd.Res.img.cursor.hand_open.toBitmap()], 0, 19, 23));
		handClose = Custom(new hxd.Cursor.CustomCursor([hxd.Res.img.cursor.hand_close.toBitmap()], 0, 19, 23));

		// Create empty bitmap
		emptyTile = h2d.Tile.fromColor(0x00000000, 1, 1);

		var globalInteractive = new h2d.Interactive(this.width, this.height, this);
		globalInteractive.cursor = handOpen;

		var tableTile = hxd.Res.img.table.toTile();
		var tableBitmap = new h2d.Bitmap(tableTile, this);
		tableBitmap.x = this.width / 2 - tableTile.width / 2;
		tableBitmap.y = 230;

		// Lighter
		var lighterTile = hxd.Res.img.Lighter.toTile();
		lighterBitmap = new h2d.Bitmap(lighterTile, this);
		lighterBitmap.x = this.width / 4 - lighterTile.width / 2;
		lighterBitmap.y = 35;
		// + Lighter Interactive
		var lighterInteractive = new h2d.Interactive(lighterTile.width, lighterTile.height, lighterBitmap);
		lighterInteractive.cursor = handClose;

		lighterInteractive.onClick = function(e:hxd.Event) {
			var scene = new scene.Firework(this.insideBowl);

			Game.instance.setScene(scene);
		}

		// Bin
		var binTile = hxd.Res.img.Bin.toTile();
		binBitmap = new h2d.Bitmap(binTile, this);
		binBitmap.x = this.width / 4 * 3 - binTile.width / 2;
		binBitmap.y = 55;

		// + Bin Interactive
		var binInteractive = new h2d.Interactive(binTile.width, binTile.height, binBitmap);
		binInteractive.cursor = handClose;

		binInteractive.onClick = function(e:hxd.Event) {
			insideBowl = {color: null, type: null, modifier: null};
			bowlContentPowderBitmap.tile = emptyTile;
			bowlContentTypeBitmap.tile = emptyTile;
			bowlContentModifierBitmap.tile = emptyTile;
		};

		// Powder Interactive
		var yellowPowder = new h2d.Interactive(53, 36, this);
		yellowPowder.x = 155;
		yellowPowder.y = 339;
		yellowPowder.cursor = handClose;

		yellowPowder.onClick = function(e:hxd.Event) {
			insideBowl.color = "yellow";
			bowlContentPowderBitmap.tile = hxd.Res.img.Yellow_Powder.toTile();
		};

		var redPowder = new h2d.Interactive(52, 38, this);
		redPowder.x = 214;
		redPowder.y = 319;
		redPowder.cursor = handClose;

		redPowder.onClick = function(e:hxd.Event) {
			insideBowl.color = "red";
			bowlContentPowderBitmap.tile = hxd.Res.img.Red_Powder.toTile();
		};

		var bluePowder = new h2d.Interactive(58, 39, this);
		bluePowder.x = 271;
		bluePowder.y = 330;
		bluePowder.cursor = handClose;

		bluePowder.onClick = function(e:hxd.Event) {
			insideBowl.color = "blue";
			bowlContentPowderBitmap.tile = hxd.Res.img.Blue_Powder.toTile();
		};

		// Type Interactive
		var circleType = new h2d.Interactive(25, 24, this);
		circleType.x = 250;
		circleType.y = 267;
		circleType.cursor = handClose;

		circleType.onClick = function(e:hxd.Event) {
			insideBowl.type = "circle";
			bowlContentTypeBitmap.tile = hxd.Res.img.Round.toTile();
		};

		var coneType = new h2d.Interactive(23, 37, this);
		coneType.x = 291;
		coneType.y = 254;
		coneType.cursor = handClose;

		coneType.onClick = function(e:hxd.Event) {
			insideBowl.type = "cone";
			bowlContentTypeBitmap.tile = hxd.Res.img.Cone.toTile();
		};

		var verticalType = new h2d.Interactive(22, 30, this);
		verticalType.x = 329;
		verticalType.y = 261;
		verticalType.cursor = handClose;

		verticalType.onClick = function(e:hxd.Event) {
			insideBowl.type = "vertical";
			bowlContentTypeBitmap.tile = hxd.Res.img.Vertical.toTile();
		};

		// Modifier Interactive
		var blinkModifier = new h2d.Interactive(71, 43, this);
		blinkModifier.x = 408;
		blinkModifier.y = 343;
		blinkModifier.cursor = handClose;

		blinkModifier.onClick = function(e:hxd.Event) {
			insideBowl.modifier = "blink";
			bowlContentModifierBitmap.tile = hxd.Res.img.Bowl_Blink.toTile();
		};

		var trailModifier = new h2d.Interactive(28, 32, this);
		trailModifier.x = 367;
		trailModifier.y = 325;
		trailModifier.cursor = handClose;

		trailModifier.onClick = function(e:hxd.Event) {
			insideBowl.modifier = "trail";
			bowlContentModifierBitmap.tile = hxd.Res.img.Bowl_Trail.toTile();
		};

		var bowlTile = hxd.Res.img.Bowl.toTile();
		bowlBitmap = new h2d.Bitmap(bowlTile, this);
		bowlBitmap.x = this.width / 2 - bowlTile.width / 2;
		bowlBitmap.y = 100;

		bowlContentPowderBitmap = new h2d.Bitmap(emptyTile, this);
		bowlContentPowderBitmap.x = this.width / 2 - bowlTile.width / 2;
		bowlContentPowderBitmap.y = 100;

		bowlContentTypeBitmap = new h2d.Bitmap(emptyTile, this);
		bowlContentTypeBitmap.x = this.width / 2 - bowlTile.width / 2;
		bowlContentTypeBitmap.y = 100;

		bowlContentModifierBitmap = new h2d.Bitmap(emptyTile, this);
		bowlContentModifierBitmap.x = this.width / 2 - bowlTile.width / 2;
		bowlContentModifierBitmap.y = 100;

		// Cat
		var cat = new h2d.Interactive(87, 51, this);
		cat.x = 423;
		cat.y = 256;
		cat.cursor = handClose;

		cat.onOver = function(e:hxd.Event) {}
		cat.onOut = function(e:hxd.Event) {}
		cat.onClick = function(e:hxd.Event) {}
	}

	public function update(dt:Float):Void {
		lighterBitmap.y = Math.cos(((hxd.Timer.lastTimeStamp * 1000) + 200) / 400) * 8 + 35;
		binBitmap.y = Math.cos(((hxd.Timer.lastTimeStamp * 1000) + 200) / 400) * 8 + 55;

		var bowlY = 35 + Math.cos(((hxd.Timer.lastTimeStamp * 1000)) / 400) * 8;
		bowlBitmap.y = bowlY;
		bowlContentPowderBitmap.y = bowlY;
		bowlContentTypeBitmap.y = bowlY;
		bowlContentModifierBitmap.y = bowlY;
	}
}
