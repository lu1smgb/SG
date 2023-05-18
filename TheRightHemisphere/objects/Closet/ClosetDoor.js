import * as THREE from '../../../libs/three.module.js'

class ClosetDoor extends THREE.Object3D {
    constructor(side="left",gui,titleGui) {

        super();

        var geomDoor = new THREE.BoxGeometry(50,200,5);
        var geomHandler = new THREE.SphereGeometry(2);

        if (side === "left") {
            geomDoor.translate(25,100,0);
            geomHandler.translate(45,100,4);
        }
        else if (side === "right") {
            geomDoor.translate(-25,100,0);
            geomHandler.translate(-45,100,4);
        }   
        
        var mat = new THREE.MeshNormalMaterial();

        var mesh = new THREE.Mesh(geomDoor, mat);
        var handler = new THREE.Mesh(geomHandler, mat);

        this.add(mesh);
        mesh.add(handler);
        

    }
    createGui(gui, titleGui) {

        

    }

    update(gui, titleGui) {

        

    }
}
export { ClosetDoor }