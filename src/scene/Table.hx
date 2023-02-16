package scene;

class Table extends scene.Scene {
	private var insideBown = {color: null, type: null, modifier: null};

	private var lighterBitmap:h2d.Bitmap;
	private var binBitmap:h2d.Bitmap;
	private var bowlBitmap:h2d.Bitmap;

	private var handClose:hxd.Cursor;
	private var handOpen:hxd.Cursor;

	public function new() {
		super();

		// Create custom cursors
		handOpen = Custom(new hxd.Cursor.CustomCursor([hxd.Res.img.cursor.hand_open.toBitmap()], 0, 19, 23));
		handClose = Custom(new hxd.Cursor.CustomCursor([hxd.Res.img.cursor.hand_close.toBitmap()], 0, 19, 23));

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

		// Bin
		var binTile = hxd.Res.img.Bin.toTile();
		binBitmap = new h2d.Bitmap(binTile, this);
		binBitmap.x = this.width / 4 * 3 - binTile.width / 2;
		binBitmap.y = 55;

		// + Bin Interactive
		var binInteractive = new h2d.Interactive(binTile.width, binTile.height, binBitmap);
		binInteractive.cursor = handClose;

		var bowlTile = hxd.Res.img.Bowl.toTile();
		bowlBitmap = new h2d.Bitmap(bowlTile, this);
		bowlBitmap.x = this.width / 2 - bowlTile.width / 2;
		bowlBitmap.y = 100;
	}

	public function update(dt:Float):Void {
		lighterBitmap.y = Math.cos(((hxd.Timer.lastTimeStamp * 1000) + 200) / 400) * 8 + 35;
		binBitmap.y = Math.cos(((hxd.Timer.lastTimeStamp * 1000) + 200) / 400) * 8 + 55;
		bowlBitmap.y = 35 + Math.cos(((hxd.Timer.lastTimeStamp * 1000)) / 400) * 8;
	}
}
