import * as THREE from '../../../libs/three.module.js'

class ClosetDoor extends THREE.Object3D {
    constructor(side="left", mat = new THREE.MeshNormalMaterial(), gui,titleGui) {

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

        var handlerMat = new THREE.MeshPhongMaterial({ color: 0x222222 });

        this.mesh = new THREE.Mesh(geomDoor, mat);
        this.handler = new THREE.Mesh(geomHandler, handlerMat);

        this.add(this.mesh);
        this.mesh.add(this.handler);
        

    }
    createGui(gui, titleGui) {

        

    }

    update(gui, titleGui) {

        

    }
}
export { ClosetDoor }