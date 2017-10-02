import * as BABYLON from 'babylonjs';

var notemesh = null
export default {
	createSky: (stage)=>{
		var skybox = BABYLON.Mesh.CreateBox("skyBox", 100.0, stage.scene)
		var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", stage.scene)
		skyboxMaterial.backFaceCulling = false
		skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/skybox", stage.scene, ["_px.png", "_py.png", "_pz.png", "_nx.png", "_ny.png", "_nz.png"])
		skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE
		skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0)
		skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0)
		skyboxMaterial.disableLighting = true
		skybox.material = skyboxMaterial
		return skybox
	},
	createWebVRCam: (stage)=>{
		var camera = new BABYLON.WebVRFreeCamera("WebVRCamera", new BABYLON.Vector3(0, 2, 0), stage.scene)
		return camera
	},

	createBox: (stage)=>{
		var box = BABYLON.Mesh.CreateBox("box", 1.0, stage.scene)
		var boxMaterial = new BABYLON.StandardMaterial("box", stage.scene)
		box.material = boxMaterial
		return box
	},
	getNoteMaterial: async (stage)=>{
		return new Promise<BABYLON.AbstractMesh>((res)=>{
			if(!notemesh){
				BABYLON.SceneLoader.ImportMesh("notesss", "/textures/", "quaver.stl", stage.scene,(meshes)=>{
					//console.log(meshes)
					var mat = new BABYLON.StandardMaterial("notemat", stage.scene)
					meshes[0].material = mat
					meshes[0].scaling.set(0.02,0.02,0.02)
					meshes[0].rotation.set(-Math.PI/2,0,0)
					notemesh = meshes[0]
					res(meshes[0])
				});
			}else{
				notemesh = notemesh.clone()
				var mat = new BABYLON.StandardMaterial("notemat", stage.scene)
				notemesh.material = mat
				notemesh.scaling.set(0.02,0.02,0.02)
				notemesh.rotation.set(-Math.PI/2,0,0)
				notemesh.position.set(0,0,0)
				res(notemesh)
			}
		})
		
		//return ret
		//return "test"
	}
}