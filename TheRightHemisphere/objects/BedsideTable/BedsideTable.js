import * as CSG from '../../../libs/CSG-v2.js';
import * as THREE from '../../../libs/three.module.js'
import * as TWEEN from '../../../libs/tween.esm.js';
import { BedsideTableDrawer } from './BedsideTableDrawer.js';

class BedsideTable extends THREE.Object3D {
    constructor(gui,titleGui) {

        super();

        var geomBody = new THREE.BoxGeometry(40, 40, 40);
        geomBody.translate(0,30,0);
        var geomLegs = new THREE.BoxGeometry(10,10,10);
        geomLegs.translate(0,5,0);
        var geomUpper = new THREE.BoxGeometry(45, 5, 45);
        geomUpper.translate(0,50,0);
        var drawerGapGeometry = new THREE.BoxGeometry(30,12.5,35);
        drawerGapGeometry.translate(0,0,5);

        var mat = new THREE.MeshPhongMaterial({ color: 0x592400});
        var textureLoader = new THREE.TextureLoader();
        var texturaBase = textureLoader.load('../../../textures/Wood04/Wood04_1K_BaseColor.png');
        texturaBase.wrapS = THREE.RepeatWrapping;
        texturaBase.wrapT = THREE.RepeatWrapping;
        var texturaNormal = textureLoader.load('../../../textures/Wood04/Wood04_1K_Normal.png');
        texturaNormal.wrapS = THREE.RepeatWrapping;
        texturaNormal.wrapT = THREE.RepeatWrapping;
        var texturaRugosidad = textureLoader.load('../../../textures/Wood04/Wood04_1K_Roughness.png');
        texturaRugosidad.wrapS = THREE.RepeatWrapping;
        texturaRugosidad.wrapT = THREE.RepeatWrapping;
        var matWood = new THREE.MeshStandardMaterial({
            map: texturaBase,
            normalMap: texturaNormal,
            roughnessMap: texturaRugosidad
        });

        var table = new THREE.Mesh(geomBody, matWood);

        var drawerGap1 = new THREE.Mesh(drawerGapGeometry, undefined);
        var drawerGap2 = new THREE.Mesh(drawerGapGeometry, undefined);
        drawerGap1.translateY(6.25 + 10 + 5);
        drawerGap2.translateY(6.25 + 10 + 22.5);

        this.abiertoAbajo = false;
        this.abiertoArriba = false;
        this.cajonAbajo = new BedsideTableDrawer(matWood);
        this.cajonAbajo.translateY(15);
        this.cajonAbajo.handle.name = "abajo";
        this.cajonAbajo.handle.userData = this;
        this.cajonArriba = new BedsideTableDrawer(matWood);
        this.cajonArriba.translateY(15 + 17.5);
        this.cajonArriba.handle.name = "arriba";
        this.cajonArriba.handle.userData = this;

        var csg = new CSG.CSG();
        csg.union([table]);
        csg.subtract([drawerGap1, drawerGap2]);
        table = csg.toMesh();
        var upper = new THREE.Mesh(geomUpper, matWood);
        var legs = [];
        for (var i=0; i < 4; i++) {
            legs.push(new THREE.Mesh(geomLegs, matWood));
            table.add(legs[i]);
        }
        legs[0].translateX(15);
        legs[0].translateZ(15);
        legs[1].translateX(15);
        legs[1].translateZ(-15);
        legs[2].translateX(-15);
        legs[2].translateZ(15);
        legs[3].translateX(-15);
        legs[3].translateZ(-15);

        this.add(table);
        table.add(upper);
        table.add(this.cajonAbajo);
        table.add(this.cajonArriba);

        this.castShadow = true; 
        this.receiveShadow = true;
        this.traverseVisible((nodo)=> {
            nodo.castShadow = true ;
            nodo.receiveShadow = true ;
        });

        this.hitbox = new THREE.Box3();
        this.hitbox.setFromObject(this);

        this.hitboxHelper = new THREE.Box3Helper(this.hitbox, 0xffff00);
        this.add(this.hitboxHelper);
        this.hitboxHelper.visible = false;

        this.setUpAnimations();

    }

    setUpAnimations() {

        var posInicialCajon = this.cajonAbajo.position.z;
        var origenCajon = {z: posInicialCajon };
        var destinoCajon = {z: posInicialCajon + 25};
        var animationTime = 1000;

        this.abrirCajonAbajo = new TWEEN.Tween(origenCajon).to(destinoCajon, animationTime);
        this.abrirCajonAbajo.easing(TWEEN.Easing.Quadratic.InOut);
        this.abrirCajonAbajo.onUpdate(() => {
            this.cajonAbajo.position.z = origenCajon.z;
        });
        this.abrirCajonAbajo.onComplete(() => {
            origenCajon.z = posInicialCajon;
        });

        this.abrirCajonArriba = new TWEEN.Tween(origenCajon).to(destinoCajon, animationTime);
        this.abrirCajonArriba.easing(TWEEN.Easing.Quadratic.InOut);
        this.abrirCajonArriba.onUpdate(() => {
            this.cajonArriba.position.z = origenCajon.z;
        });
        this.abrirCajonArriba.onComplete(() => {
            origenCajon.z = posInicialCajon;
        });

        this.cerrarCajonAbajo = new TWEEN.Tween(destinoCajon).to(origenCajon, animationTime);
        this.cerrarCajonAbajo.easing(TWEEN.Easing.Quadratic.InOut);
        this.cerrarCajonAbajo.onUpdate(() => {
            this.cajonAbajo.position.z = destinoCajon.z;
        });
        this.cerrarCajonAbajo.onComplete(() => {
            destinoCajon.z = posInicialCajon + 25;
        });

        this.cerrarCajonArriba = new TWEEN.Tween(destinoCajon).to(origenCajon, animationTime);
        this.cerrarCajonArriba.easing(TWEEN.Easing.Quadratic.InOut);
        this.cerrarCajonArriba.onUpdate(() => {
            this.cajonArriba.position.z = destinoCajon.z;
        });
        this.cerrarCajonArriba.onComplete(() => {
            destinoCajon.z = posInicialCajon + 25;
        });

    }

    abrirAbajo() {
        this.abrirCajonAbajo.start();
        this.abiertoAbajo = true;
    }

    abrirArriba() {
        this.abrirCajonArriba.start();
        this.abiertoArriba = true;
    }

    cerrarAbajo() {
        this.cerrarCajonAbajo.start();
        this.abiertoAbajo = false;
    }

    cerrarArriba() {
        this.cerrarCajonArriba.start();
        this.abiertoArriba = false;
    }

    pickAction(meshClicado) {
        switch(meshClicado.name) {
            case 'abajo':
                if (this.abiertoAbajo) {
                    this.cerrarAbajo();
                }
                else {
                    this.abrirAbajo();
                }
                break;
            case 'arriba':
                if (this.abiertoArriba) {
                    this.cerrarArriba();
                }
                else {
                    this.abrirArriba();
                }
                break;
        }
    }

    update() {

        TWEEN.update();

    }
}
export { BedsideTable }