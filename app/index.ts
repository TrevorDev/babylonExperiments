import * as BABYLON from 'babylonjs'
var canvas:any = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
var scene = new BABYLON.Scene(engine);
var camera = new BABYLON.FreeCamera("", new BABYLON.Vector3(0,0,-5), scene)
var light = new BABYLON.HemisphericLight("", new BABYLON.Vector3(0,-1,1), scene)

var box = BABYLON.MeshBuilder.CreateBox("", {}, scene)
for(var i = 0;i<10;i++){
    var boxCopy = box.clone("")
    boxCopy.position.x+=1.5*i
}

engine.runRenderLoop(()=>{
    scene.render();
});
window.addEventListener("resize", ()=>{
    engine.resize();
});