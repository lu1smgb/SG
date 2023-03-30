import * as THREE from '../libs/three.module.js'

class Clock extends THREE.Object3D {
    constructor(gui,titleGui) {

        super();

        var geomIndicador = new THREE.SphereGeometry(1,10,10);
        var matIndicador = new THREE.MeshPhongMaterial({ color: 0x00aaff });
        var matManecilla = new THREE.MeshPhongMaterial({ color: 0x00ff00 });

        var distanciaIndicadores = 6;
        var distanciaManecilla = 4;

        for (let i=0; i < 12; i++) {
            var indicador = new THREE.Mesh(geomIndicador, matIndicador);
            indicador.position.set(Math.cos(i * (2 * Math.PI / 12)) * distanciaIndicadores,
                                   0,
                                   Math.sin(i * (2 * Math.PI / 12)) * distanciaIndicadores);
            if (i == 0) {
                var manecilla = new THREE.Mesh(geomIndicador, matManecilla);
                manecilla.position.set(distanciaManecilla, 0, 0);
                manecilla.name = 'manecilla';
                this.add(manecilla);
            }
            this.add(indicador);
        }

    }

    createGui(gui, titleGui) {

        

    }

    update(gui, titleGui) {

        
        
    }
}
export { Clock }