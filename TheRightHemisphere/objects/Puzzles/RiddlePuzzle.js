import * as THREE from '../../../libs/three.module.js'
import { Painting } from '../Painting/Painting.js';

class RiddlePuzzle extends THREE.Object3D {
    constructor() {

        super();

        this.painting = new Painting('../../../imgs/sample-canvas2.png');
        this.painting.canvas.userData = this;
        this.add(this.painting);

        this.generado = false;
        this.resuelto = false;
        this.key = null;
        this.fan = null;

    }

    spawnKey() {

        var geomKey = new THREE.SphereGeometry(10,30,30);

        var mat = new THREE.MeshNormalMaterial();

        this.key = new THREE.Mesh(geomKey, mat);
        this.key.userData = this;
        this.key.name = 'Key';

        this.add(this.key);

    }

    pickAction(meshClicado) {

        if (!this.resuelto) {

            console.log('pick');
            if (this.fan.enabled && !this.generado) {

                this.spawnKey();
                this.generado = true;
    
            }
            else if (this.generado && meshClicado.name == 'Key') {
                
                console.log('RESUELTO PUZZLE DEL ACERTIJO');
                alert("Has obtenido la llave esférica");
                this.resuelto = true;
                this.remove(this.key);
    
            }

        }

    }

    update() {

        

    }
}
export { RiddlePuzzle }