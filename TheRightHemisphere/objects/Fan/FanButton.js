// Clase que modela el boton del ventilador

import * as THREE from '../../../libs/three.module.js'

class FanButton extends THREE.Object3D {
    constructor(color=0xff0000, gui, titleGui) {

        super();

        var geomButton = new THREE.BoxGeometry(2.5,2.5,2);
        var mat = new THREE.MeshPhongMaterial({ color: color, flatShading: true });

        this.mesh = new THREE.Mesh(geomButton, mat);

        this.add(this.mesh);

    }
    createGui(gui, titleGui) {

        

    }

    update(gui, titleGui) {

        

    }
}
export { FanButton }