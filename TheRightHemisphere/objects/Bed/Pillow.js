import * as THREE from '../../../libs/three.module.js'

class Pillow extends THREE.Object3D {
    constructor(gui,titleGui) {

        super();

        var shape = new THREE.Shape();
        shape.ellipse(3,0,3,10);
        var extrude = new THREE.ExtrudeGeometry(shape, {
            depth: 80,
            bevelThickness: 3
        });
        extrude.rotateY(Math.PI / 2);
        extrude.translate(-40,0,0);
        extrude.rotateX(Math.PI / 2);

        var mat = new THREE.MeshNormalMaterial();

        var mesh = new THREE.Mesh(extrude, mat);
        
        this.add(mesh);

    }
    createGui(gui, titleGui) {

        

    }

    update(gui, titleGui) {

        

    }
}
export { Pillow }