import * as THREE from '../../../libs/three.module.js'

class Painting extends THREE.Object3D {
    constructor(image) {

        super();

        var biselGeometry = new THREE.TorusGeometry(35, 5, 6, 4);
        biselGeometry.rotateZ(Math.PI / 4);
        var canvasGeometry = new THREE.BoxGeometry(45,45,1);

        var textureLoader = new THREE.TextureLoader();

        var drawing = textureLoader.load(image);

        var frameTextureRootPath = "../../../textures/wood026/";
        var frameTextureBase = textureLoader.load(frameTextureRootPath + "base.jpg");
        var frameTextureAmbient = textureLoader.load(frameTextureRootPath + "ambient.jpg");
        var frameTextureDisplacement = textureLoader.load(frameTextureRootPath + "height.png")
        var frameTextureRoughness = textureLoader.load(frameTextureRootPath + "roughness.jpg");

        var frameMat = new THREE.MeshPhongMaterial({
            map: frameTextureBase,
            displacementMap: frameTextureDisplacement,
            aoMap: frameTextureAmbient,
            bumpMap: frameTextureRoughness
        });

        var canvasMat = new THREE.MeshPhongMaterial({
            map: drawing
        });

        this.frame = new THREE.Mesh(biselGeometry, frameMat);
        this.canvas = new THREE.Mesh(canvasGeometry, canvasMat);

        this.translateZ(2.5);
        this.add(this.frame);
        this.add(this.canvas);

        this.castShadow = true; 
        this.receiveShadow = true;
        this.traverseVisible((nodo)=> {
            nodo.castShadow = true ;
            nodo.receiveShadow = true ;
        });

        this.hitbox = new THREE.Box3();
        this.hitbox.setFromObject(this);

        this.hitboxHelper = new THREE.Box3Helper(this.hitbox, 0xffff00);
        this.add(this.hitboxHelper);
        this.hitboxHelper.visible = false;

    }

    createGui() {

        

    }

    pickAction() {
        
    }

    update() {

        

    }
}
export { Painting }