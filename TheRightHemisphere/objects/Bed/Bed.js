import * as THREE from '../../../libs/three.module.js'
import { Mattress } from './Mattress.js';
import { Pillow } from './Pillow.js';

class Bed extends THREE.Object3D {
    constructor(gui,titleGui) {

        super();

        var geomBody = new THREE.BoxGeometry(100,10,200);
        var geomLeg = new THREE.BoxGeometry(5,15,5);
        geomBody.translate(0, 5, 0);
        geomLeg.translate(0, -7.5, 0);

        var mat = new THREE.MeshPhongMaterial({ color: 0x524400 });
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

        var body = new THREE.Mesh(geomBody, matWood);
        var bedLegs = [];
        for (var i=0; i < 4; i++) {
            bedLegs.push(new THREE.Mesh(geomLeg, matWood));
            body.add(bedLegs[i]);
        }

        bedLegs[0].translateX(45);
        bedLegs[0].translateZ(-95);
        bedLegs[1].translateX(45);
        bedLegs[1].translateZ(95);
        bedLegs[2].translateX(-45);
        bedLegs[2].translateZ(-95);
        bedLegs[3].translateX(-45);
        bedLegs[3].translateZ(95);

        var pillow = new Pillow();
        var mattress = new Mattress();
        body.add(mattress);
        body.add(pillow);
        mattress.translateY(10);
        pillow.translateY(35);
        pillow.translateZ(-80);
        
        this.translateY(15);
        this.add(body);

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

    }
    createGui(gui, titleGui) {

        

    }

    update(gui, titleGui) {

        

    }
}
export { Bed }