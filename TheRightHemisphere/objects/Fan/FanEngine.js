// Clase que modela la turbina del ventilador

import * as THREE from '../../../libs/three.module.js'
import { FanBlade } from './FanBlade.js';

class FanEngine extends THREE.Object3D {
    constructor(num_blades=3, size=10, material = new THREE.MeshPhongMaterial(), gui,titleGui) {

        super();

        var geomEngine = new THREE.CylinderGeometry(3,4,size,60);
        geomEngine.rotateX(Math.PI / 2);
        geomEngine.translate(0, 0, -size/2 + 2);

        var engine = new THREE.Mesh(geomEngine, material);

        this.add(engine);

        for (let i=0; i < num_blades; i++) {
            var blade = new FanBlade(3, material);
            blade.rotateZ((i/num_blades) * 2 * Math.PI);
            engine.add(blade);
        }

        this.translateZ(size - size/2);

    }
    createGui(gui, titleGui) {

        

    }

    update(gui, titleGui) {

        

    }
}
export { FanEngine }