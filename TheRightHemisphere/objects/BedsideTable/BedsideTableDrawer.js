import * as THREE from '../../../libs/three.module.js'
import * as CSG from '../../../libs/CSG-v2.js'

class BedsideTableDrawer extends THREE.Object3D {
    constructor(mat,gui,titleGui) {

        super();

        var geomDrawer = new THREE.BoxGeometry(30,12.5,35);
        geomDrawer.translate(0, 6.25, 0); // Sobre el plano XZ
        var innerGeomDrawer = new THREE.BoxGeometry(28,11.5,33);
        // Ancho del suelo = 1
        innerGeomDrawer.translate(0,10.5,0);
        var geomHandle = new THREE.SphereGeometry(2);
        // A la misma altura que el cajón
        // Eje Z: mitad de la profundidad del cajon + un poco menos del radio de la asa
        geomHandle.translate(0,6.25,19);

        var handlerMat = new THREE.MeshPhongMaterial({ color: 0x222222 });

        this.drawer = new THREE.Mesh(geomDrawer, mat);
        this.handle = new THREE.Mesh(geomHandle, handlerMat);
        var inner = new THREE.Mesh(innerGeomDrawer, undefined)
        var csg = new CSG.CSG();
        csg.union([this.drawer]);
        csg.subtract([inner]);
        this.mesh = csg.toMesh();
        this.mesh.translateZ(2.5);
        this.mesh.add(this.handle);
        this.add(this.mesh);

    }
    createGui(gui, titleGui) {

        

    }

    update(gui, titleGui) {

        

    }
}
export { BedsideTableDrawer }