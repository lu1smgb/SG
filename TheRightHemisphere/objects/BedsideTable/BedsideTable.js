import * as CSG from '../../../libs/CSG-v2.js';
import * as THREE from '../../../libs/three.module.js'
import { BedsideTableDrawer } from './BedsideTableDrawer.js';

class BedsideTable extends THREE.Object3D {
    constructor(gui,titleGui) {

        super();

        var geomBody = new THREE.BoxGeometry(40, 40, 40);
        geomBody.translate(0,30,0);
        var geomLegs = new THREE.BoxGeometry(10,10,10);
        geomLegs.translate(0,5,0);
        var geomUpper = new THREE.BoxGeometry(45, 5, 45);
        geomUpper.translate(0,50,0);
        var drawerGapGeometry = new THREE.BoxGeometry(30,12.5,35);
        drawerGapGeometry.translate(0,0,5);

        var mat = new THREE.MeshNormalMaterial();

        var table = new THREE.Mesh(geomBody, mat);

        var drawerGap1 = new THREE.Mesh(drawerGapGeometry, undefined);
        var drawerGap2 = new THREE.Mesh(drawerGapGeometry, undefined);
        drawerGap1.translateY(6.25 + 10 + 5);
        drawerGap2.translateY(6.25 + 10 + 22.5);

        var drawer1 = new BedsideTableDrawer();
        drawer1.translateY(15);
        var drawer2 = new BedsideTableDrawer();
        drawer2.translateY(15 + 17.5);

        var csg = new CSG.CSG();
        csg.union([table]);
        csg.subtract([drawerGap1, drawerGap2]);
        table = csg.toMesh();
        var upper = new THREE.Mesh(geomUpper, mat);
        var legs = [];
        for (var i=0; i < 4; i++) {
            legs.push(new THREE.Mesh(geomLegs, mat));
            table.add(legs[i]);
        }
        legs[0].translateX(15);
        legs[0].translateZ(15);
        legs[1].translateX(15);
        legs[1].translateZ(-15);
        legs[2].translateX(-15);
        legs[2].translateZ(15);
        legs[3].translateX(-15);
        legs[3].translateZ(-15);

        this.add(table);
        table.add(upper);
        table.add(drawer1);
        table.add(drawer2);

    }
    createGui(gui, titleGui) {

        

    }

    update(gui, titleGui) {

        

    }
}
export { BedsideTable }