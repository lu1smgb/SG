import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'

class AnimatedObject extends THREE.Object3D {
    constructor(gui,titleGui) {

        super();

        // Declaramos el objeto a animar
        var geomObj = new THREE.ConeGeometry(0.5,2,3);
        geomObj.rotateX(Math.PI / 2)
        var matObj = new THREE.MeshNormalMaterial({ flatShading: true });
        this.obj = new THREE.Mesh(geomObj, matObj);
        this.add(this.obj);

        this.animate();

    }

    createGui(gui, titleGui) {

        

    }

    animate() {

        // ANIMACION POR DEFECTO

        // Coordenadas de origen y destino
        var origen =  { x: 0, y: 0, z: 5 };
        var destino = { x: 5, y: 0, z: 0 };

        // Objeto encargado de la animación
        var movimiento = new TWEEN.Tween(origen).to(destino, 2000);

        // Control de la velocidad
        movimiento.easing(TWEEN.Easing.Quadratic.InOut);
        movimiento.repeat(Infinity).yoyo(true);

        // El objeto `origen` va actualizándose
        movimiento.onUpdate(() => {
            this.obj.position.x = origen.x;
            this.obj.position.z = origen.z;
        })

        movimiento.onComplete(() => {
            this.obj.position.x = 0;
            this.obj.position.z = 5;
        })

        // Empezamos la animación
        movimiento.start();

    }

    update() {

        TWEEN.update();

    }
}
export { AnimatedObject }