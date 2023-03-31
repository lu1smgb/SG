import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'
import { AnimatedObject } from './AnimatedObject.js';

class ObjetoEjercicio extends AnimatedObject {
    constructor(gui,titleGui) {

        super();

    }

    animate() {

        // OBJETIVO: Dos animaciones en bucle una tras otra

        var puntoOrigen = new THREE.Vector3(0, 2, 0);
        var puntoPausa = new THREE.Vector3(0, 4, 0);

        var trayectorias = [
            new THREE.CatmullRomCurve3([
                puntoOrigen,
                new THREE.Vector3(1,2,0),
                new THREE.Vector3(5,3,0),
                new THREE.Vector3(0,2,-5),
                new THREE.Vector3(0,4,-2),
                puntoPausa
            ]),
            new THREE.CatmullRomCurve3([
                puntoPausa,
                new THREE.Vector3(0,4,1),
                new THREE.Vector3(0,5,5),
                new THREE.Vector3(-5,3,0),
                new THREE.Vector3(-1,2,0),
                puntoOrigen
            ])
        ];

        var geomBuffer = new THREE.BufferGeometry();
        var matLine = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 });
        geomBuffer.setFromPoints(trayectorias[0].getPoints(100).concat(trayectorias[1].getPoints(100)));
        var recorridoVisible = new THREE.Line(geomBuffer, matLine);
        this.add(recorridoVisible);

        var origen = { t: 0 };
        var destino = { t: 1 };
        var origen2 = { t: 0 };
        var destino2 = { t: 1 };
        var easingMode = TWEEN.Easing.Quadratic.InOut;
        
        var animaciones = [
            new TWEEN.Tween(origen).to(destino, 4000)
                .onUpdate(() => {
                    // El objeto mirará hacia el frente
                    var posicion = trayectorias[0].getPointAt(origen.t);
                    this.obj.position.copy(posicion);
                    var tangente = trayectorias[0].getTangentAt(origen.t);
                    posicion.add(tangente);
                    this.obj.lookAt(posicion);
                })
                .onComplete(() => {
                    animaciones[1].start();
                })
                .easing(easingMode),
            new TWEEN.Tween(origen2).to(destino2, 8000)
                .onUpdate(() => {
                    // El objeto mirará hacia el frente
                    var posicion = trayectorias[1].getPointAt(origen2.t);
                    this.obj.position.copy(posicion);
                    var tangente = trayectorias[1].getTangentAt(origen2.t);
                    posicion.add(tangente);
                    this.obj.lookAt(posicion);
                })
                .onComplete(() => {
                    animaciones[0].start();
                })
                .easing(easingMode)
        ];

        animaciones[0].start();

    }
}
export { ObjetoEjercicio }