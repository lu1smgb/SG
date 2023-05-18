// https://free3d.com/3d-model/coat-hangers-v3--232748.html
import * as THREE from '../../../libs/three.module.js'
import { OBJLoader } from '../../../libs/OBJLoader.js';
import { MTLLoader } from '../../../libs/MTLLoader.js';

class CoatHangers extends THREE.Object3D {
    constructor(gui,titleGui) {

        super();

        var objLoader = new OBJLoader();
        var mtlLoader = new MTLLoader();
        mtlLoader.load("../../../models/coat_hangers/10922_Coat_hangers_v3_LOD3.mtl",
            (materials) => {
                objLoader.setMaterials(materials);
                objLoader.load("../../../models/coat_hangers/10922_Coat_hangers_v3_LOD3.obj",
                    (obj) => {
                        obj.translateY(-9.2);
                        obj.translateZ(7.8);
                        obj.rotateX(-Math.PI / 2);
                        obj.rotateZ(Math.PI / 2);
                        this.add(obj);
                    }
                );
            }, null, null
        );

        this.scale.set(2,2,2);

    }
    createGui(gui, titleGui) {

        

    }

    update(gui, titleGui) {

        

    }
}
export { CoatHangers }