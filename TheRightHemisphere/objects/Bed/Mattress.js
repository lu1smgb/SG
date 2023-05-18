import * as THREE from '../../../libs/three.module.js'

class Mattress extends THREE.Object3D {
    constructor(gui,titleGui) {

        super();

        var shapeMattress = new THREE.Shape();
        shapeMattress.moveTo(-45,100);
        shapeMattress.lineTo(45,100);
        shapeMattress.quadraticCurveTo(50,100,50,95);
        shapeMattress.lineTo(50,-95);
        shapeMattress.quadraticCurveTo(50,-100,45,-100);
        shapeMattress.lineTo(-45,-100);
        shapeMattress.quadraticCurveTo(-50,-100,-50,-95);
        shapeMattress.lineTo(-50,95);
        shapeMattress.quadraticCurveTo(-50,100,-45,100);
        var options = {
            depth: 20,
            bevelThickness: 2
        };
        var geomMattress = new THREE.ExtrudeGeometry(shapeMattress, options);
        geomMattress.rotateX(Math.PI/2);

        var mat = new THREE.MeshNormalMaterial();

        var mattress = new THREE.Mesh(geomMattress, mat);
        mattress.translateY(22);

        this.add(mattress);

    }
    createGui(gui, titleGui) {

        

    }

    update(gui, titleGui) {

        

    }
}
export { Mattress }