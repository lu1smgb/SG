import * as THREE from '../../../libs/three.module.js'
import * as CSG from '../../../libs/CSG-v2.js'
import { FanButton } from './FanButton.js';
import { FanEngine } from './FanEngine.js';

class Fan extends THREE.Object3D {
    constructor(gui,titleGui) {

        super();

        var geomBase = new THREE.CylinderGeometry(15,15,5,4);
        geomBase.translate(0, 2.5, 0);

        var geomTop = new THREE.CylinderGeometry(10,15,2.5,4);
        geomTop.translate(0, 6.25, 0);

        var blueButton = new FanButton(0x00aaff);
        blueButton.rotateY(Math.PI / 4);
        blueButton.translateX(7.5);
        blueButton.translateY(2.5);
        blueButton.translateZ(11);

        var geomNeck = new THREE.CylinderGeometry(1.5,1.5,20,60);
        geomNeck.translate(0, 10, 0);

        var mat = new THREE.MeshPhongMaterial({ color: 0x888888 });

        var base = new THREE.Mesh(geomBase, mat);

        var top = new THREE.Mesh(geomTop, mat);

        var neck = new THREE.Mesh(geomNeck, mat);
        neck.rotateY(Math.PI / 4);
        neck.translateY(7.5);
        neck.translateZ(-3);

        var engine = new FanEngine(3, 10, mat);
        engine.translateY(20);
        engine.rotateZ(0);

        var csg = new CSG.CSG();
        csg.union([base, top]);
        var obj = csg.toMesh();
        obj.rotateY(Math.PI / 4);

        this.add(obj);
        obj.add(blueButton);
        obj.add(neck);
        neck.add(engine);

    }

    createGui(gui, titleGui) {

        

    }

    update(gui, titleGui) {

        

    }
}
export { Fan }