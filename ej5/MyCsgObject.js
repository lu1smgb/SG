import * as THREE from '../libs/three.module.js'
import * as CSG from '../libs/CSG-v2.js'

class MyCsgObject extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();

        // Geometria del cilindro exterior (copa)
        var copaGeometry = new THREE.CylinderGeometry(3,3,5,20)
        copaGeometry.translate(0,3,0);

        // Geometria de la visera
        var viseraGeometry = new THREE.CylinderGeometry(4,4,1,20);

        // Geometria de la cinta (otro cilindro)
        var cintaGeometry = new THREE.CylinderGeometry(3.1,3.1,1,20);
        cintaGeometry.translate(0,1,0);

        // Geometria del cilindro que usaremos para la diferencia
        var diffGeometry = new THREE.CylinderGeometry(2.5, 2.5, 5.5,20);
        diffGeometry.translate(0,2,0);

        // Declaración de materiales
        var copaMaterial = new THREE.MeshPhongMaterial({color: 0x222222});
        var cintaMaterial = new THREE.MeshNormalMaterial();

        // Declaración de los Meshes
        var outerCil = new THREE.Mesh(copaGeometry, cintaMaterial);
        var visera = new THREE.Mesh(viseraGeometry, cintaMaterial);
        var cinta = new THREE.Mesh(cintaGeometry, cintaMaterial);
        var diffMesh = new THREE.Mesh(diffGeometry, cintaMaterial);

        // Construcción del objeto CSG
        var finalObj = new CSG.CSG();
        finalObj.union([outerCil, visera, cinta]);
        finalObj.subtract([diffMesh]);
        finalObj = finalObj.toMesh();
        this.add(finalObj);
    }

    createGui(gui, titleGui) {
        //...
    }

    update(gui, titleGui) {
        this.children[0].rotation.y += 0.01;
        this.children[0].rotation.x += 0.01;
        this.children[0].rotation.z += 0.01;
    }
}

export { MyCsgObject }