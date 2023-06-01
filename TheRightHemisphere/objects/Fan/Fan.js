// Clase que implementa el modelo jerárquico del ventilador y la
// interacción del mismo con el usuario

import * as THREE from '../../../libs/three.module.js'
import * as CSG from '../../../libs/CSG-v2.js'
import * as TWEEN from '../../../libs/tween.esm.js'

import { FanButton } from './FanButton.js';
import { FanEngine } from './FanEngine.js';

class Fan extends THREE.Object3D {
    constructor(gui,titleGui) {

        super();

        this._clk = new THREE.Clock();
        this.enabled = false;
        this.rpm = 180;

        var geomBase = new THREE.CylinderGeometry(15,15,5,4);
        geomBase.translate(0, 2.5, 0);

        var geomTop = new THREE.CylinderGeometry(10,15,2.5,4);
        geomTop.translate(0, 6.25, 0);

        this.blueButton = new FanButton(0x00aaff);
        this.blueButton.name = "button";
        this.blueButton.rotateY(Math.PI / 4);
        this.blueButton.translateX(7.5);
        this.blueButton.translateY(2.5);
        this.blueButton.translateZ(11);
        this.blueButton.mesh.userData = this;

        var geomNeck = new THREE.CylinderGeometry(1.5,1.5,20,60);
        geomNeck.translate(0, 10, 0);

        var mat = new THREE.MeshPhongMaterial({ color: 0x888888 });

        var base = new THREE.Mesh(geomBase, mat);

        var top = new THREE.Mesh(geomTop, mat);

        var neck = new THREE.Mesh(geomNeck, mat);
        neck.name = "neck";
        neck.rotateY(Math.PI / 4);
        neck.translateY(7.5);
        neck.translateZ(-3);

        this.engine = new FanEngine(3, 10, mat);
        this.engine.name = "engine";
        this.engine.translateY(20);
        this.engine.rotateZ(0);

        var csg = new CSG.CSG();
        csg.union([base, top]);
        var obj = csg.toMesh();
        obj.rotateY(Math.PI / 4);

        this.add(obj);
        obj.add(this.blueButton);
        obj.add(neck);
        neck.add(this.engine);

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

        var origenVentilador = {r: 0};
        var destinoVentilador = {r: 2 * Math.PI};
        var tiempoPorVuelta = 60000 / this.rpm;
        this.movimientoVentilador = new TWEEN.Tween(origenVentilador).to(destinoVentilador, tiempoPorVuelta);
        this.movimientoVentilador.onUpdate(() => { this.engine.rotation.z = origenVentilador.r; });
        this.movimientoVentilador.onComplete(() => { origen.r = 0; });
        this.movimientoVentilador.repeat(Infinity);

        var posBotonInicialX = this.blueButton.position.x;
        var posBotonInicialZ = this.blueButton.position.z;
        var origenBoton = {x: posBotonInicialX, z: posBotonInicialZ};
        var destinoBoton = {x: posBotonInicialX - 0.5 , z: posBotonInicialZ - 0.5};

        this.movimientoBotonOn = new TWEEN.Tween(origenBoton).to(destinoBoton, 1000);
        this.movimientoBotonOn.easing(TWEEN.Easing.Back.InOut);
        this.movimientoBotonOn.onUpdate(() => {
            this.blueButton.position.x = origenBoton.x;
            this.blueButton.position.z = origenBoton.z;
        });
        this.movimientoBotonOn.onComplete(() => {
            origenBoton.x = posBotonInicialX;
            origenBoton.z = posBotonInicialZ;
            this.enabled = true;
            this.movimientoVentilador.resume();
        });
        this.movimientoBotonOn.chain(this.movimientoVentilador);

        this.movimientoBotonOff = new TWEEN.Tween(destinoBoton).to(origenBoton, 1000);
        this.movimientoBotonOff.easing(TWEEN.Easing.Back.InOut);
        this.movimientoBotonOff.onUpdate(() => {
            this.blueButton.position.x = destinoBoton.x;
            this.blueButton.position.z = destinoBoton.z
        });
        this.movimientoBotonOff.onComplete(() => {
            destinoBoton.x = posBotonInicialX - 0.5;
            destinoBoton.z = posBotonInicialZ - 0.5;
            this.enabled = false;
            this.movimientoVentilador.pause();
        });
        
    }

    turnOn() {
        this.movimientoBotonOn.start();
    }

    turnOff() {
        this.movimientoBotonOff.start();
    }

    pickAction() {
        if (this.enabled) {
            this.turnOff();
        }
        else {
            this.turnOn();
        }
    }

    update(gui, titleGui) {

        TWEEN.update();

    }
}
export { Fan }