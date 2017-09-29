import * as BABYLON from 'babylonjs';

class Stage {
	engine: BABYLON.Engine
	scene: BABYLON.Scene
	canvas:any
	constructor(canvasId:string){
		this.canvas = document.getElementById("renderCanvas");
		this.engine = new BABYLON.Engine(this.canvas, true);
		this.scene = new BABYLON.Scene(this.engine);
		this.engine.runRenderLoop(()=>{
			this.scene.render();
		});
		window.addEventListener("resize", ()=>{
			this.engine.resize();
		});
	}

}

export default Stage