import * as THREE from '../../../libs/three.module.js'

class Pillow extends THREE.Object3D {
    constructor(gui,titleGui) {

        super();

        var shape = new THREE.Shape();
        shape.ellipse(3,0,3,10);
        var extrude = new THREE.ExtrudeGeometry(shape, {
            curveSegments: 64,
            depth: 80,
            steps: 30,
            bevelThickness: 3,
            bevelSegments: 10
        });
        extrude.rotateY(Math.PI / 2);
        extrude.translate(-40,0,5);
        extrude.rotateX(-Math.PI / 2);

        var mat = new THREE.MeshPhongMaterial({ color: 0xcdcdcd });

        var mesh = new THREE.Mesh(extrude, mat);
        
        this.add(mesh);

    }
    createGui(gui, titleGui) {

        

    }

    update(gui, titleGui) {

        

    }
}
export { Pillow }