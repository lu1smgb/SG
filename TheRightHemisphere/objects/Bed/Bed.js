import * as THREE from '../../../libs/three.module.js'
import { Mattress } from './Mattress.js';
import { Pillow } from './Pillow.js';

class Bed extends THREE.Object3D {
    constructor(gui,titleGui) {

        super();

        var geomBody = new THREE.BoxGeometry(100,10,200);
        var geomLeg = new THREE.BoxGeometry(5,15,5);
        geomBody.translate(0, 5, 0);
        geomLeg.translate(0, -7.5, 0);

        var mat = new THREE.MeshNormalMaterial();

        var body = new THREE.Mesh(geomBody, mat);
        var bedLegs = [];
        for (var i=0; i < 4; i++) {
            bedLegs.push(new THREE.Mesh(geomLeg, mat));
            body.add(bedLegs[i]);
        }

        bedLegs[0].translateX(45);
        bedLegs[0].translateZ(-95);
        bedLegs[1].translateX(45);
        bedLegs[1].translateZ(95);
        bedLegs[2].translateX(-45);
        bedLegs[2].translateZ(-95);
        bedLegs[3].translateX(-45);
        bedLegs[3].translateZ(95);

        var pillow = new Pillow();
        var mattress = new Mattress();
        mattress.translateY(10);
        body.add(mattress);
        pillow.translateY(25);
        pillow.translateZ(-80);
        mattress.add(pillow);

        this.translateY(15);
        this.add(body);

    }
    createGui(gui, titleGui) {

        

    }

    update(gui, titleGui) {

        

    }
}
export { Bed }