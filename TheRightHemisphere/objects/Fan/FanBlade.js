import * as THREE from '../../../libs/three.module.js'

class FanBlade extends THREE.Object3D {
    constructor(size = 1, material = new THREE.MeshNormalMaterial(), gui, titleGui) {

        super();

        var shape = new THREE.Shape();
        shape.quadraticCurveTo(0,2,2,3);
        shape.quadraticCurveTo(4,4,2,5);
        shape.quadraticCurveTo(-3,7,-1,0);
        shape.quadraticCurveTo(-0.5,0.25,0,0);

        var options = {
            curveSegments: 30,
            steps: 10,
            depth: 0.01,
            bevelSegments: 10
        }
        var geomBlade = new THREE.ExtrudeGeometry(shape, options);
        geomBlade.scale(size, size, size);
        geomBlade.translate(size/2,-0.25,0);

        var blade = new THREE.Mesh(geomBlade, material);

        this.add(blade);

    }
    
    createGui(gui, titleGui) {

        

    }

    update(gui, titleGui) {

        

    }
}
export { FanBlade }