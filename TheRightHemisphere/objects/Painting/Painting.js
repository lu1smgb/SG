import * as THREE from '../../../libs/three.module.js'

class Painting extends THREE.Object3D {
    constructor(image,gui,titleGui) {

        super();

        var biselGeometry = new THREE.TorusGeometry(35, 5, 6, 4);
        biselGeometry.rotateZ(Math.PI / 4);
        var canvasGeometry = new THREE.BoxGeometry(45,45,1);

        // TODO placeholder
        var frameMat = new THREE.MeshNormalMaterial({ flatShading: true });

        var imageLoader = new THREE.TextureLoader();
        var image = imageLoader.load(image);
        var canvasMat = new THREE.MeshPhongMaterial({map: image});

        var frame = new THREE.Mesh(biselGeometry, frameMat);

        var canvas = new THREE.Mesh(canvasGeometry, canvasMat);

        this.translateZ(2.5);
        this.add(frame);
        this.add(canvas);

    }
    createGui(gui, titleGui) {

        

    }

    update(gui, titleGui) {

        

    }
}
export { Painting }