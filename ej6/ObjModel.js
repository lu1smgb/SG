import * as THREE from '../libs/three.module.js'
import {MTLLoader} from '../libs/MTLLoader.js'
import {OBJLoader} from '../libs/OBJLoader.js'

class ObjModel extends THREE.Object3D {
    constructor(gui,titleGui) {

        super();
        
        // Cargamos los recursos
        var materialLoader = new MTLLoader();
        var objectLoader = new OBJLoader();
        materialLoader.load('../models/porsche911/911.mtl',
            //? Cuando el material es cargado correctamente 
            (materials) => {
                objectLoader.setMaterials(materials);
                objectLoader.load('../models/porsche911/Porsche_911_GT2.obj',
                    //? Cuando el objeto es cargado correctamente
                    (object) => {
                        // Ajustamos un poco para que se vea bien y grande
                        object.scale.set(5,5,5);
                        object.rotation.y = Math.PI;
                        this.add(object);
                    },
                null, null);
            }
        );

    }

    createGui(gui, titleGui) {
        //...
    }

    update(gui, titleGui) {
        //...
    }
}
export { ObjModel }