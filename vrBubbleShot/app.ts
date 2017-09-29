import * as BABYLON from 'babylonjs'
import Stage from "../stage/stage"
import objectCreator from "../stage/objectCreator"

var stage = new Stage("renderCanvas")


var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 6, 0), stage.scene)
var skybox = objectCreator.createSky(stage)
var camera = objectCreator.createWebVRCam(stage)

stage.scene.registerBeforeRender(function () {

})

