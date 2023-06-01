import * as THREE from '../../../libs/three.module.js'
import { OBJLoader } from '../../../libs/OBJLoader.js';
import { MTLLoader } from '../../../libs/MTLLoader.js';

class Chair extends THREE.Object3D {
    constructor(gui,titleGui) {

        super();

        var objLoader = new OBJLoader();
        var mtlLoader = new MTLLoader();
        var textureLoader = new THREE.TextureLoader();

        mtlLoader.load('../../../models/Chair/10239_Office_Chair_v1_L3.mtl',
            (materials) => {
                objLoader.setMaterials(materials);
                objLoader.load('../../../models/Chair/10239_Office_Chair_v1_L3.obj',
                    (obj) => {
                        obj.rotateX(-Math.PI / 2);
                        var diffuseTexture = textureLoader.load('../../../models/Chair/10239_Office_Chair_v1_Diffuse.jpg');
                        obj.children[0].material.map = diffuseTexture;
                        this.add(obj);
                    }   
                );
            }
        );

    }
    createGui(gui, titleGui) {

        

    }

    update(gui, titleGui) {

        

    }
}
export { Chair }