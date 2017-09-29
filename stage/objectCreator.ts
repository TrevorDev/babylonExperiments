import * as BABYLON from 'babylonjs'

export default {
	createSky: (stage)=>{
		var skybox = BABYLON.Mesh.CreateBox("skyBox", 100.0, stage.scene)
		var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", stage.scene)
		skyboxMaterial.backFaceCulling = false
		skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/skybox", stage.scene)
		skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE
		skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0)
		skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0)
		skyboxMaterial.disableLighting = true
		skybox.material = skyboxMaterial
		return skybox
	},
	createWebVRCam: (stage)=>{
		var camera = new BABYLON.UniversalCamera("WebVRCamera", new BABYLON.Vector3(0, 2, 0), stage.scene)
		camera.attachControl(stage.canvas)
		return camera
	}
}