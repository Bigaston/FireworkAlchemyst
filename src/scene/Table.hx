package scene;

class Table extends scene.Scene {
	private var insideBown = {color: null, type: null, modifier: null};

	private var lighterBitmap:h2d.Bitmap;
	private var binBitmap:h2d.Bitmap;
	private var bowlBitmap:h2d.Bitmap;

	public function new() {
		super();

		var tableTile = hxd.Res.img.table.toTile();
		var tableBitmap = new h2d.Bitmap(tableTile, this);
		tableBitmap.x = this.width / 2 - tableTile.width / 2;
		tableBitmap.y = 230;

		var lighterTile = hxd.Res.img.Lighter.toTile();
		lighterBitmap = new h2d.Bitmap(lighterTile, this);
		lighterBitmap.x = this.width / 4 - lighterTile.width / 2;
		lighterBitmap.y = 35;

		var binTile = hxd.Res.img.Bin.toTile();
		binBitmap = new h2d.Bitmap(binTile, this);
		binBitmap.x = this.width / 4 * 3 - binTile.width / 2;
		binBitmap.y = 55;

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
