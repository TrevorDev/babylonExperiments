import * as BABYLON from 'babylonjs'
import Stage from "../stage/stage"
import objectCreator from "../stage/objectCreator"
import MidiKeyboard from "./midiKeyboard"


var main = async ()=>{
	var clock = {
	    before: performance.now(),
	    getDelta: function() {
	        var now = performance.now()
	        var delta = now - this.before 
	        this.before = now
	        return delta
	    }
	}
	
	var stage = new Stage("renderCanvas");
	var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 6, 0), stage.scene)
	var skybox = objectCreator.createSky(stage)
	var camera = objectCreator.createWebVRCam(stage)
	stage.scene.onPointerDown = function () {
		console.log("hit")
	    stage.scene.onPointerDown = undefined
	    camera.attachControl(stage.canvas, true);
	}
	
	for(var i = 0;i<32;i++){
		var note = 53+i
		var noteMesh = await objectCreator.getNoteMaterial(stage)
		var noteColor = (note-53)/31
		console.log(noteColor)
		noteMesh.material.diffuseColor = new BABYLON.Color3(noteColor, noteColor, noteColor);
		noteMesh.position.z = 10
		noteMesh.position.x = -(53+15-note)*0.5
	}

	var notes = []
	var midiKeyboard = new MidiKeyboard()
	await midiKeyboard.init()

	midiKeyboard.keyDown = async (note, vel)=>{
		if(vel < 10){
			return
		}
		var noteMesh = await objectCreator.getNoteMaterial(stage)
		var noteColor = (note-53)/31
		console.log(noteColor)
		noteMesh.material.diffuseColor = new BABYLON.Color3(noteColor, noteColor, noteColor);
		noteMesh.position.z = 10
		noteMesh.position.x = -(53+15-note)*0.5
		notes.push({mesh: noteMesh, vel: vel})
		console.log(note)
	}

	stage.scene.registerBeforeRender(function () {
		var delta = clock.getDelta()
		//console.log(delta)
		notes.forEach((n)=>{
			var spd = (delta/20)*n.vel/128/2
			n.mesh.position.y += spd
			n.mesh.position.z += spd
		})
	})
}
main()






