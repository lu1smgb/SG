import * as THREE from '../../../libs/three.module.js'
import * as CSG from '../../../libs/CSG-v2.js'

class BedsideTableDrawer extends THREE.Object3D {
    constructor(gui,titleGui) {

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

        // TODO Placeholder
        var mat = new THREE.MeshNormalMaterial();

        var drawer = new THREE.Mesh(geomDrawer, mat);
        var handle = new THREE.Mesh(geomHandle, undefined);
        var inner = new THREE.Mesh(innerGeomDrawer, undefined)
        var csg = new CSG.CSG();
        csg.union([drawer, handle]);
        csg.subtract([inner]);
        var mesh = csg.toMesh();
        mesh.translateZ(2.5);
        this.add(mesh);

    }
    createGui(gui, titleGui) {

        

    }

    update(gui, titleGui) {

        

    }
}
export { BedsideTableDrawer }