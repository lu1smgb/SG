import * as CSG from '../../../libs/CSG-v2.js'
import * as THREE from '../../../libs/three.module.js'
import * as TWEEN from '../../../libs/tween.esm.js'
import { ClosetDoor } from './ClosetDoor.js';
import { CoatHangers } from './CoatHangers.js';

// TODO: Implementar un cajon

class Closet extends THREE.Object3D {
    constructor(gui,titleGui) {

        super();

        this.open = false;

        var geomCloset = new THREE.BoxGeometry(100,200,60);
        var innerGeomCloset = new THREE.BoxGeometry(95,195,57.5);
        var geomDrawerSep = new THREE.BoxGeometry(95,2.5,55);
        var geomBar = new THREE.CylinderGeometry(1,1,95);
        innerGeomCloset.translate(0,0,2.5);
        geomDrawerSep.translate(0,-42.5,0);
        geomBar.rotateZ(Math.PI / 2);

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

        var closet = new THREE.Mesh(geomCloset, matWood);
        var sep = new THREE.Mesh(geomDrawerSep, matWood);
        var bar = new THREE.Mesh(geomBar, matWood);
        var csg = new CSG.CSG();
        csg.union([closet]);
        csg.subtract([new THREE.Mesh(innerGeomCloset, undefined)]);
        var mesh = csg.toMesh();
        mesh.add(sep);
        mesh.add(bar);
        mesh.translateY(100);
        bar.translateY(80);

        this.add(mesh);

        this.closetDoors = [new ClosetDoor("left", matWood), new ClosetDoor("right", matWood)];
        
        this.closetDoors[0].translateX(-50);
        this.closetDoors[0].translateZ(32.5);
        this.closetDoors[1].translateX(50);
        this.closetDoors[1].translateZ(32.5);
        this.closetDoors[0].handler.userData = this;
        this.closetDoors[1].handler.userData = this;

        this.hangers = new CoatHangers();
        this.hangers.translateX(-20);
        bar.add(this.hangers);

        this.add(this.closetDoors[0]);
        this.add(this.closetDoors[1]);

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

        var origenPuertas = {r: 0};
        var destinoPuertas = {r: Math.PI / 1.5};
        this.animacionAbrir = new TWEEN.Tween(origenPuertas).to(destinoPuertas, 1000);
        this.animacionAbrir.onUpdate(() => {
            this.closetDoors.forEach((door, idx) => {
                door.rotation.y = (idx ? 1 : -1) * origenPuertas.r;
            });
        });
        this.animacionAbrir.onComplete(() => {
            origenPuertas.r = 0;
        });
        this.animacionAbrir.easing(TWEEN.Easing.Quadratic.InOut);

        this.animacionCerrar = new TWEEN.Tween(destinoPuertas).to(origenPuertas, 1000);
        this.animacionCerrar.onUpdate(() => {
            this.closetDoors.forEach((door, idx) => {
                door.rotation.y = (idx ? 1 : -1) * destinoPuertas.r;
            });
        });
        this.animacionCerrar.onComplete(() => {
            destinoPuertas.r = Math.PI / 1.5;
        });
        this.animacionCerrar.easing(TWEEN.Easing.Quadratic.InOut);

    }

    abrir() {
        this.animacionAbrir.start();
        this.open = true;
    }

    cerrar() {
        this.animacionCerrar.start();
        this.open = false;
    }

    pickAction(meshClicado) {

        if (this.open) {
            this.cerrar();
        }
        else {
            this.abrir();
        }

    }

    update() {

        TWEEN.update();

    }
}
export { Closet }