import * as THREE from '../../../libs/three.module.js'
import * as CSG from '../../../libs/CSG-v2.js'
import * as TWEEN from '../../../libs/tween.esm.js';

class Door extends THREE.Object3D {
    constructor(gui,titleGui) {

        super();

        this.open = false;

        // Esto lo inicializaremos en la habitacion
        this.puzzles = [];

        var geomDoor = new THREE.BoxGeometry(100, 200, 10);
        geomDoor.translate(50, 100, 0);

        var geomHandler1 = new THREE.CylinderGeometry(2,2,2,30);
        geomHandler1.translate(0, 1, 0);
        geomHandler1.rotateX(Math.PI / 2);
        var geomHandler2 = new THREE.BoxGeometry(15,2,2);
        geomHandler2.translate(-6.5, 3, 0);
        geomHandler2.rotateX(Math.PI / 2);

        var doorMat = new THREE.MeshPhongMaterial({ color: 0xa0a0a0 });
        var handlerMat = new THREE.MeshPhongMaterial({ color: 0xffe74a });

        this.door = new THREE.Mesh(geomDoor, doorMat);

        var csg = new CSG.CSG();
        csg.union([
            new THREE.Mesh(geomHandler1, handlerMat),
            new THREE.Mesh(geomHandler2, handlerMat)
        ]);
        this.handler = csg.toMesh();
        this.handler.translateX(90);
        this.handler.translateY(90);
        this.handler.translateZ(5);
        this.handler.userData = this;

        this.add(this.door);
        this.door.add(this.handler);

        this.castShadow = true; 
        this.receiveShadow = true;
        this.traverseVisible((nodo)=> {
            nodo.castShadow = true ;
            nodo.receiveShadow = true ;
        });

        this.setUpAnimations();

        this.hitbox = new THREE.Box3();
        this.hitbox.setFromObject(this);

        this.hitboxHelper = new THREE.Box3Helper(this.hitbox, 0xffff00);
        this.add(this.hitboxHelper);
        this.hitboxHelper.visible = false;

    }

    setUpAnimations() {

        var posPomoInicial = {r: 0};
        var posPomoFinal = {r: Math.PI / 3};
        var posPuertaInicial = {r: 0};
        var posPuertaFinal = {r: Math.PI / 2};

        this.movimientoSoltarPomo = new TWEEN.Tween(posPomoFinal).to(posPomoInicial, 1000);
        this.movimientoSoltarPomo.onUpdate(() => { this.handler.rotation.z = posPomoFinal.r });
        this.movimientoSoltarPomo.easing(TWEEN.Easing.Quadratic.InOut);
        this.movimientoSoltarPomo.onComplete(() => { posPomoFinal.r = Math.PI / 3; });

        this.animacionAbrir = new TWEEN.Tween(posPuertaInicial).to(posPuertaFinal, 2000);
        this.animacionAbrir.onUpdate(() => { this.door.rotation.y = posPuertaInicial.r });
        this.animacionAbrir.easing(TWEEN.Easing.Cubic.InOut);
        this.animacionAbrir.onComplete( () => {
            posPuertaInicial.r = 0;
            this.open = true;
            alert("Felicidades! Has completado The Right Hemisphere, espero que te haya gustado :)");
        });

        this.animacionCerrar = new TWEEN.Tween(posPuertaFinal).to(posPuertaInicial, 2000);
        this.animacionCerrar.onUpdate(() => { this.door.rotation.y = posPuertaFinal.r });
        this.animacionCerrar.easing(TWEEN.Easing.Quadratic.InOut);
        this.animacionCerrar.onComplete( () => {
            posPuertaFinal.r = Math.PI / 2;
            this.open = false;
        });
        
        this.movimientoAgarrarPomo = new TWEEN.Tween(posPomoInicial).to(posPomoFinal, 1000);
        this.movimientoAgarrarPomo.onUpdate(() => { this.handler.rotation.z = posPomoInicial.r });
        this.movimientoAgarrarPomo.onComplete(() => {
            posPomoInicial.r = 0;
        })
        this.movimientoAgarrarPomo.easing(TWEEN.Easing.Quadratic.InOut);
        this.movimientoAgarrarPomo.chain(this.animacionAbrir);

        this.animacionAbrir.chain(this.movimientoSoltarPomo);

    }

    abrir() {

        if (!this.open) {
            this.movimientoAgarrarPomo.start();
        }

    }

    cerrar() {

        if (this.open) {
            this.animacionCerrar.start();
        }

    }

    pickAction(meshClicado) {

        // Comprobamos que todos los puzzles estan resueltos
        // En caso afirmativo, la puerta se desbloqueara

        var todo_listo = true;
        this.puzzles.forEach(puzzle => {
            if (!puzzle.resuelto) {
                todo_listo = false;
            }
        });

        if (todo_listo) {

            if (this.open) {
                this.cerrar();
            }
            else {
                this.abrir();
            }

        }
        else {
            alert("La puerta parece estar bloqueada...");
        }

    }

    update(gui, titleGui) {

        TWEEN.update();

    }
}
export { Door }