import * as THREE from '../../../libs/three.module.js'
import * as TWEEN from '../../../libs/tween.esm.js';

class RainbowPuzzle extends THREE.Object3D {
    constructor(gui,titleGui) {

        super();

        var geomPieza = new THREE.SphereGeometry(5,20,20);
        geomPieza.translate(0,5,0);

        var matRojo = new THREE.MeshPhongMaterial({ color: THREE.Color.NAMES.red });
        var matNaranja = new THREE.MeshPhongMaterial({ color: THREE.Color.NAMES.orange });
        var matAmarillo = new THREE.MeshPhongMaterial({ color: THREE.Color.NAMES.yellow });
        var matVerde = new THREE.MeshPhongMaterial({ color: THREE.Color.NAMES.green });
        var matAzul = new THREE.MeshPhongMaterial({ color: THREE.Color.NAMES.blue });
        var matMorado = new THREE.MeshPhongMaterial({ color: THREE.Color.NAMES.purple });

        this.piezaRojo = new THREE.Mesh(geomPieza, matRojo);
        this.piezaRojo.name = 'Rojo';
        this.piezaRojo.userData = this;
        this.piezaRojo.translateX(-30);
        this.piezaRojo.translateY(40);
        this.piezaRojo.translateZ(-15);
        
        this.piezaNaranja = new THREE.Mesh(geomPieza, matNaranja);
        this.piezaNaranja.name = 'Naranja';
        this.piezaNaranja.userData = this; 
        this.piezaNaranja.translateX(20);
        this.piezaNaranja.translateY(50);

        this.piezaAmarillo = new THREE.Mesh(geomPieza, matAmarillo);
        this.piezaAmarillo.name = 'Amarillo';
        this.piezaAmarillo.userData = this;
        this.piezaAmarillo.translateZ(10);
        this.piezaAmarillo.translateY(10);

        this.piezaVerde = new THREE.Mesh(geomPieza, matVerde);
        this.piezaVerde.name = 'Verde';
        this.piezaVerde.userData = this;
        this.piezaVerde.translateX(5);
        this.piezaVerde.translateY(30);
        this.piezaVerde.translateZ(-5);      

        this.piezaAzul = new THREE.Mesh(geomPieza, matAzul);
        this.piezaAzul.name = 'Azul';
        this.piezaAzul.userData = this;
        this.piezaAzul.translateX(-10); 
        this.piezaAzul.translateY(20);
        this.piezaAzul.translateZ(-15);
        
        this.piezaMorado = new THREE.Mesh(geomPieza, matMorado);
        this.piezaMorado.name = 'Morado';
        this.piezaMorado.userData = this;  
        this.piezaMorado.translateX(-20);  
        this.piezaMorado.translateY(60);  

        this.add(this.piezaRojo);
        this.add(this.piezaNaranja);
        this.add(this.piezaAmarillo);
        this.add(this.piezaVerde);
        this.add(this.piezaAzul);
        this.add(this.piezaMorado);

        this.secuenciaGanadora = [
            this.piezaRojo.name,
            this.piezaNaranja.name,
            this.piezaAmarillo.name,
            this.piezaVerde.name,
            this.piezaAzul.name,
            this.piezaMorado.name,
        ];
        this.secuenciaActual = [];
        this.secuenciaCompletada = false; // La secuencia para que aparezca la llave se ha completado satisfactoriamente
        this.resuelto = false; // Se ha completado el puzzle y recogido la llave

    }

    spawnKey() {

        var geomKey = new THREE.BoxGeometry(10,10,10);

        var material = new THREE.MeshNormalMaterial();

        this.key = new THREE.Mesh(geomKey, material);

        this.key.name = 'Key';
        this.key.userData = this;

        this.key.translateY(80);

        this.add(this.key);

        this.remove(this.piezaRojo);
        this.remove(this.piezaNaranja);
        this.remove(this.piezaAmarillo);
        this.remove(this.piezaVerde);
        this.remove(this.piezaAzul);
        this.remove(this.piezaMorado);

    }

    pickAction(meshClicado) {

        if (!this.secuenciaCompletada) {

            console.log(meshClicado.name);

            if (this.secuenciaGanadora[this.secuenciaActual.length] == meshClicado.name) {
                this.secuenciaActual.push(meshClicado.name);
            }
            else {
                this.secuenciaActual = [];
            }

            if (this.secuenciaActual.length == this.secuenciaGanadora.length) {
                this.spawnKey();
                this.secuenciaCompletada = true;
            }
    
            console.log(this.secuenciaActual);

        }
        else {

            if (meshClicado.name == 'Key' && !this.resuelto) {

                this.pickupKey();
                alert("Has obtenido la llave cúbica");
                console.log("RESUELTO PUZZLE ARCOIRIS");

            }

        }
        
    }

    pickupKey() {

        this.remove(this.key);
        this.resuelto = true;

    }

    createGui(gui, titleGui) {

        

    }

    update(gui, titleGui) {

        

    }
}
export { RainbowPuzzle }