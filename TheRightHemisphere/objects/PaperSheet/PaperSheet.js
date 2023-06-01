import * as THREE from '../../../libs/three.module.js'

class PaperSheet extends THREE.Object3D {
    constructor(img) {

        super();

        var loader = new THREE.TextureLoader();

        var imagen = loader.load(img);

        var geomSheet = new THREE.BoxGeometry(30,0.1,40);
        geomSheet.rotateY(Math.PI);

        var mat = new THREE.MeshPhongMaterial({ map: imagen });

        var mesh = new THREE.Mesh(geomSheet, mat);

        this.add(mesh);

    }
}
export { PaperSheet }