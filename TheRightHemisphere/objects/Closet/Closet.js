import * as CSG from '../../../libs/CSG-v2.js'
import * as THREE from '../../../libs/three.module.js'
import { ClosetDoor } from './ClosetDoor.js';
import { CoatHangers } from './CoatHangers.js';

// TODO: Implementar un cajon

class Closet extends THREE.Object3D {
    constructor(gui,titleGui) {

        super();

        var geomCloset = new THREE.BoxGeometry(100,200,60);
        var innerGeomCloset = new THREE.BoxGeometry(95,195,57.5);
        var geomDrawerSep = new THREE.BoxGeometry(95,2.5,55);
        var geomBar = new THREE.CylinderGeometry(1,1,95);
        innerGeomCloset.translate(0,0,2.5);
        geomDrawerSep.translate(0,-42.5,0);
        geomBar.rotateZ(Math.PI / 2);

        var mat = new THREE.MeshNormalMaterial();

        var closet = new THREE.Mesh(geomCloset, mat);
        var sep = new THREE.Mesh(geomDrawerSep, mat);
        var bar = new THREE.Mesh(geomBar, mat);
        var csg = new CSG.CSG();
        csg.union([closet]);
        csg.subtract([new THREE.Mesh(innerGeomCloset, undefined)]);
        var mesh = csg.toMesh();
        mesh.add(sep);
        mesh.add(bar);
        mesh.translateY(100);
        bar.translateY(80);

        this.add(mesh);

        var closetDoors = [new ClosetDoor("left"), new ClosetDoor("right")];
        
        closetDoors[0].translateX(-50);
        closetDoors[0].translateZ(32.5);
        closetDoors[0].rotateY(-Math.PI / 1.5);
        closetDoors[1].translateX(50);
        closetDoors[1].translateZ(32.5);
        closetDoors[1].rotateY(Math.PI / 1.5);

        var hangers = new CoatHangers();
        hangers.translateX(-20);
        bar.add(hangers);

        this.add(closetDoors[0]);
        this.add(closetDoors[1]);

    }
    createGui(gui, titleGui) {

        

    }

    update(gui, titleGui) {

        

    }
}
export { Closet }