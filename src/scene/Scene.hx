package scene;

import h2d.Scene;

abstract class Scene extends h2d.Scene {
	public var elements:Array<entity.Entity> = [];

	public function new() {
		super();

		this.scaleMode = Fixed(650, 500, 1, Center, Center);
	}

	abstract public function update(dt:Float):Void;
}
