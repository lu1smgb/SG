import * as THREE from '../libs/three.module.js'
import { PenduloRojo } from './PenduloRojo.js'
import { PenduloAzul } from './PenduloAzul.js'

class PenduloDoble extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();
        
        var penduloRojo = new PenduloRojo(gui, 'Pendulo rojo');
        var penduloAzul = new PenduloAzul(gui, 'Pendulo azul');

        penduloRojo.name = 'penduloRojo';
        penduloAzul.name = 'penduloAzul';

        penduloAzul.position.z = 1;

        this.add(penduloRojo);
        penduloRojo.add(penduloAzul);
    }

    createGui(gui, titleGui) {
        this.getObjectByName('penduloRojo').createGui(gui, 'Pendulo rojo');
        this.getObjectByName('penduloAzul').createGui(gui, 'Pendulo azul');
    }

    update(gui, titleGui) {
        this.getObjectByName('penduloRojo').update();
        this.getObjectByName('penduloAzul').update();
    }
}
export { PenduloDoble }