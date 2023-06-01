import * as THREE from '../../../libs/three.module.js'

class Desktop extends THREE.Object3D {
    constructor(gui,titleGui) {

        super();

        var legGeom = new THREE.BoxGeometry(5,70,5);
        legGeom.translate(0,-35,0);

        var geomTable = new THREE.BoxGeometry(150,5,100);
        geomTable.translate(0,2.5,0);

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

        var legs = [];
        for (var i = 0; i < 4; i++) {

            legs.push(new THREE.Mesh(legGeom, matWood));

        }

        legs[0].translateX(-60);
        legs[0].translateZ(-27.5);
        legs[1].translateX(-60);
        legs[1].translateZ(27.5);
        legs[2].translateX(60);
        legs[2].translateZ(-27.5);
        legs[3].translateX(60);
        legs[3].translateZ(27.5);

        var table = new THREE.Mesh(geomTable, matWood);

        for (var i=0; i < legs.length; i++) {
            table.add(legs[i]);
        }

        this.add(table);

        this.translateY(75);


    }

    update() {

    }

}
export { Desktop }