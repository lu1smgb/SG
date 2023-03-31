import * as THREE from '../libs/three.module.js'

class Clock extends THREE.Object3D {
    constructor(gui,titleGui) {

        super();

        var geomIndicador = new THREE.SphereGeometry(0.5,30,30);
        var geomManecilla = new THREE.IcosahedronGeometry(1,0);
        var matIndicador = new THREE.MeshPhongMaterial({ color: 0x00aaff });
        var matManecilla = new THREE.MeshPhongMaterial({ color: 0x00ff00 });

        this.clk = new THREE.Clock();

        this.distanciaIndicadores = 6;
        this.distanciaManecilla = 4;

        this.angulo = .0;

        for (let i=0; i < 12; i++) {
            var indicador = new THREE.Mesh(geomIndicador, matIndicador);
            indicador.position.set(Math.cos(i * (2 * Math.PI / 12)) * this.distanciaIndicadores,
                                   0,
                                   Math.sin(i * (2 * Math.PI / 12)) * this.distanciaIndicadores);
            if (i == 0) {
                var manecilla = new THREE.Mesh(geomManecilla, matManecilla);
                //manecilla.position.set(this.distanciaManecilla, 0, 0);
                manecilla.name = 'manecilla';
                this.add(manecilla);
            }
            this.add(indicador);
        }

        this.createGui(gui,titleGui);

    }

    createGui(gui, titleGui) {

        this.guiControls = {
            mps: 1,

            reset: () => {
                this.guiControls.mps = 1;
            }
        }

        var folder = gui.addFolder('Reloj');

        folder.add(this.guiControls, 'mps',-12,12,1).name('Marcas por segundo').listen();

    }

    update(gui, titleGui) {

        // Gracias :)
        // https://stackoverflow.com/questions/946641/changing-the-speed-of-a-circular-motion
        var delta = this.clk.getDelta();
        this.angulo += this.guiControls.mps * delta;
        var manecilla = this.getObjectByName('manecilla');

        manecilla.position.x = this.distanciaManecilla * Math.cos(this.angulo);
        manecilla.position.z = this.distanciaManecilla * Math.sin(this.angulo);

        // Un pequeño detalle
        manecilla.rotateX(delta);
        manecilla.rotateY(delta);

    }
}
export { Clock }