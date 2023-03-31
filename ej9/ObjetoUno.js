import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'
import { AnimatedObject } from './AnimatedObject.js';

class ObjetoUno extends AnimatedObject {
    constructor(gui,titleGui) {

        super();

    }

    animate() {

        // Ejemplo de uso de recorrido de animación mediante un spline

        // Trayectoria, la declaramos y la dibujamos
        var spline = new THREE.CatmullRomCurve3([
            new THREE.Vector3(0,0,0),
            new THREE.Vector3(3,1,0),
            new THREE.Vector3(3,2,3),
            new THREE.Vector3(0,3,3),
            new THREE.Vector3(0,4,0),
            new THREE.Vector3(3,5,0),
            new THREE.Vector3(3,6,3),
            new THREE.Vector3(0,7,3),
            new THREE.Vector3(-5,7,3),
            new THREE.Vector3(-5,7,0),
            new THREE.Vector3(-4,1,0)
        ], true);
        var geomLine = new THREE.BufferGeometry();
        geomLine.setFromPoints(spline.getPoints(100));
        var matLine = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 });
        var visibleSpline = new THREE.Line(geomLine, matLine);
        this.add(visibleSpline);

        // Declaramos la animación y sus parámetros
        var origen = { t: 0 };
        var destino = { t: 1 };
        var tiempoRecorrido = 6000;
        var animacion = new TWEEN.Tween(origen).to(destino, tiempoRecorrido)
            .onUpdate(() => {
                // El objeto mirará hacia el frente
                var posicion = spline.getPointAt(origen.t);
                this.obj.position.copy(posicion);
                var tangente = spline.getTangentAt(origen.t);
                posicion.add(tangente);
                this.obj.lookAt(posicion);
            })
            .easing(TWEEN.Easing.Quadratic.InOut)
            .repeat(Infinity);

        animacion.start();

    }
}
export { ObjetoUno }