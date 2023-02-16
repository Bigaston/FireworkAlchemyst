package scene;

abstract class Scene extends h2d.Scene {
	public var elements:Array<entity.Entity> = [];

	abstract public function update(dt:Float):Void;
}
