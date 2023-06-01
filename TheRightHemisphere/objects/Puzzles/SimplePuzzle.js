import * as THREE from '../../../libs/three.module.js'

class SimplePuzzle extends THREE.Object3D {
    constructor(gui,titleGui) {

        super();

        this.resuelto = false;

        var geomKey = new THREE.TetrahedronGeometry(5,0);

        var matKey = new THREE.MeshNormalMaterial();

        this.key = new THREE.Mesh(geomKey, matKey);
        this.key.userData = this;

        this.add(this.key);

    }

    createGui(gui, titleGui) {

        

    }

    pickAction(meshClicado) {

        if (!this.resuelto) {

            console.log('RESUELTO PUZZLE SIMPLE');
            alert("Has obtenido la llave piramidal");
            this.resuelto = true;
            this.key.visible = false;

        }

    }

    update(gui, titleGui) {

        

    }
}
export { SimplePuzzle }