import * as THREE from '../../libs/three.module.js'
import * as TWEEN from '../../libs/tween.esm.js'
import * as CSG from '../../libs/CSG-v2.js'

import { Fan } from './Fan/Fan.js';
import { BedsideTable } from './BedsideTable/BedsideTable.js';
import { Closet } from './Closet/Closet.js';
import { Bed } from './Bed/Bed.js';
import { Painting } from './Painting/Painting.js';
import { Door } from './Door/Door.js';
import { RainbowPuzzle } from './Puzzles/RainbowPuzzle.js';
import { SimplePuzzle } from './Puzzles/SimplePuzzle.js';
import { Desktop } from './Desktop/Desktop.js';
import { Chair } from './Chair/Chair.js';
import { PaperSheet } from './PaperSheet/PaperSheet.js';
import { RiddlePuzzle } from './Puzzles/RiddlePuzzle.js';

class Room extends THREE.Object3D {
    constructor(width=500,depth=500,height=250,gui,titleGui) {

        super();

        this.width = width;
        this.depth = depth;
        this.height = height;
        this.pickable = [];

        // ----- Geometria del suelo, paredes y techo -----
        // Geometria del suelo
        var geomFloor = new THREE.BoxGeometry(this.width, 1, this.depth);
        geomFloor.translate(0, -0.5, 0);

        // Geometria de las paredes
        var geomWalls = [];
        geomWalls.push(new THREE.BoxGeometry(this.width, this.height, 1));
        geomWalls[0].rotateY(Math.PI / 2);
        geomWalls[0].translate(-this.width / 2, 0, 0);
        geomWalls.push(new THREE.BoxGeometry(this.width, this.height, 1));
        geomWalls[1].rotateY(-Math.PI / 2);
        geomWalls[1].translate(this.width / 2, 0, 0);
        geomWalls.push(new THREE.BoxGeometry(this.depth, this.height, 1));
        geomWalls[2].translate(0, 0, -depth / 2);
        geomWalls.push(new THREE.BoxGeometry(this.depth, this.height, 1));
        geomWalls[3].rotateY(Math.PI);
        geomWalls[3].translate(0, 0, this.depth / 2);
        for (let i=0; i < geomWalls.length; i++) {
            geomWalls[i].translate(0, this.height / 2, 0);
        }

        // Geometria del techo
        var geomCeiling = new THREE.BoxGeometry(this.width, 1, this.depth);
        geomCeiling.translate(0, this.height + 0.5, 0);

        // TODO: Placeholder (material de las paredes y techos)
        var textureLoader = new THREE.TextureLoader();
        var texturaSueloBase = textureLoader.load('../../textures/WoodenFloor01/WoodenFloor01_1K_BaseColor.png');
        texturaSueloBase.wrapS = THREE.RepeatWrapping;
        texturaSueloBase.wrapT = THREE.RepeatWrapping;
        texturaSueloBase.repeat.set(4,4);
        var texturaSueloAO = textureLoader.load('../../textures/WoodenFloor01/WoodenFloor01_1K_AO.png');
        texturaSueloAO.wrapS = THREE.RepeatWrapping;
        texturaSueloAO.wrapT = THREE.RepeatWrapping;
        texturaSueloAO.repeat.set(4,4);
        var texturaSueloNormal = textureLoader.load('../../textures/WoodenFloor01/WoodenFloor01_1K_Normal.png');
        texturaSueloNormal.wrapS = THREE.RepeatWrapping;
        texturaSueloNormal.wrapT = THREE.RepeatWrapping;
        texturaSueloNormal.repeat.set(4,4);
        var texturaSueloRelieve = textureLoader.load('../../textures/WoodenFloor01/WoodenFloor01_1K_Height.png');
        texturaSueloRelieve.wrapS = THREE.RepeatWrapping;
        texturaSueloRelieve.wrapT = THREE.RepeatWrapping;
        texturaSueloRelieve.repeat.set(4,4);
        var texturaSueloRugosidad = textureLoader.load('../../textures/WoodenFloor01/WoodenFloor01_1K_Roughness.png');
        texturaSueloRugosidad.wrapS = THREE.RepeatWrapping;
        texturaSueloRugosidad.wrapT = THREE.RepeatWrapping;
        texturaSueloRugosidad.repeat.set(4,4);
        var matSuelo = new THREE.MeshStandardMaterial({
            map: texturaSueloBase, 
            aoMap: texturaSueloAO, 
            aoMapIntensity: 0.5,
            normalMap: texturaSueloNormal,
            normalScale: new THREE.Vector2(0.2,0.2),
            displacementMap: texturaSueloRelieve,
            displacementScale: 1,
            roughnessMap: texturaSueloRugosidad
        });

        var texturaParedBase = textureLoader.load('../../textures/BrickWall22/BrickWall22_1K_BaseColor.png');
        texturaParedBase.wrapS = THREE.RepeatWrapping;
        texturaParedBase.wrapT = THREE.RepeatWrapping;
        texturaParedBase.repeat.set(2,1);
        var texturaParedAO = textureLoader.load('../../textures/BrickWall22/BrickWall22_1K_AO.png');
        texturaParedAO.wrapS = THREE.RepeatWrapping;
        texturaParedAO.wrapT = THREE.RepeatWrapping;
        texturaParedAO.repeat.set(2,1);
        var texturaParedNormal = textureLoader.load('../../textures/BrickWall22/BrickWall22_1K_Normal.png');
        texturaParedNormal.wrapS = THREE.RepeatWrapping;
        texturaParedNormal.wrapT = THREE.RepeatWrapping;
        texturaParedNormal.repeat.set(2,1);
        var texturaParedRelieve = textureLoader.load('../../textures/BrickWall22/BrickWall22_1K_Height.png');
        texturaParedRelieve.wrapS = THREE.RepeatWrapping;
        texturaParedRelieve.wrapT = THREE.RepeatWrapping;
        texturaParedRelieve.repeat.set(2,1);
        var texturaParedRugosidad = textureLoader.load('../../textures/WoodenFloor01/WoodenFloor01_1K_Roughness.png');
        texturaParedRugosidad.wrapS = THREE.RepeatWrapping;
        texturaParedRugosidad.wrapT = THREE.RepeatWrapping;
        texturaParedRugosidad.repeat.set(2,1);
        var matPared = new THREE.MeshStandardMaterial({
            map: texturaParedBase, 
            aoMap: texturaParedAO,
            aoMapIntensity: 0.5,
            normalMap: texturaParedNormal,
            displacementMap : texturaParedRelieve,
            displacementScale : 1,
            roughnessMap : texturaParedRugosidad
        });

        var texturaTechoBase = textureLoader.load('../../textures/WhiteStuccoWall01/WhiteStuccoWall01_1K_BaseColor.png');
        texturaTechoBase.wrapS = THREE.RepeatWrapping;
        texturaTechoBase.wrapT = THREE.RepeatWrapping;
        var texturaTechoAO = textureLoader.load('../../textures/WhiteStuccoWall01/WhiteStuccoWall01_1K_AO.png');
        texturaTechoAO.wrapS = THREE.RepeatWrapping;
        texturaTechoAO.wrapT = THREE.RepeatWrapping;
        var texturaTechoNormal = textureLoader.load('../../textures/WhiteStuccoWall01/WhiteStuccoWall01_1K_Normal.png');
        texturaTechoNormal.wrapS = THREE.RepeatWrapping;
        texturaTechoNormal.wrapT = THREE.RepeatWrapping;
        var texturaTechoRelieve = textureLoader.load('../../textures/WhiteStuccoWall01/WhiteStuccoWall01_1K_Height.png');
        texturaTechoRelieve.wrapS = THREE.RepeatWrapping;
        texturaTechoRelieve.wrapT = THREE.RepeatWrapping;
        var texturaTechoRugosidad = textureLoader.load('../../textures/WhiteStuccoWall01/WhiteStuccoWall01_1K_Roughness.png');
        texturaTechoRugosidad.wrapS = THREE.RepeatWrapping;
        texturaTechoRugosidad.wrapT = THREE.RepeatWrapping;
        var matTecho = new THREE.MeshStandardMaterial({
            map: texturaTechoBase,
            aoMap: texturaParedAO,
            aoMapIntensity: 0.5,
            normalMap: texturaTechoNormal,
            displacementMap: texturaParedRelieve,
            displacementScale: 1,
            roughnessMap: texturaTechoRugosidad
        });

        var mat = new THREE.MeshPhongMaterial({ color: 0xc0c0c0 });

        // Luces
        var ambientLight = new THREE.AmbientLight(0xffeedd, 0.3);
        this.add(ambientLight);

        var pointLight = new THREE.PointLight(0xffffff, 1, 500);
        pointLight.position.set(0,200,0);
        this.add(pointLight);

        var pointLightHelper = new THREE.PointLightHelper(pointLight, 10, 0x00ffff);
        //this.add(pointLightHelper);

        var spotLight = new THREE.SpotLight(0xffffaa, 0.9, 600, Math.PI / 2, 0.7, 0.5);
        spotLight.position.set(0,230,0);
        this.add(spotLight);

        var spotLightHelper = new THREE.SpotLightHelper(spotLight, 0x00ffff);
        //this.add(spotLightHelper);

        // Mesh del suelo
        var floor = new THREE.Mesh(geomFloor, matSuelo);
        floor.receiveShadow = true;
        floor.castShadow = false;
        
        // Meshes de las paredes
        var walls = [];
        for (let i=0; i < geomWalls.length; i++) {
            walls.push(new THREE.Mesh(geomWalls[i], matPared));
        }
        
        // Hacemos el hueco para la puerta mediante CSG
        var csgDoorGap = new CSG.CSG();
        var geomDoorGap = new THREE.BoxGeometry(100,200,10);
        geomDoorGap.translate(50,100,0);
        var meshDoorGap = new THREE.Mesh(geomDoorGap, new THREE.MeshPhongMaterial({ wireframe: true }));
        meshDoorGap.translateX(250);
        meshDoorGap.translateZ(-50);
        meshDoorGap.rotateY(-Math.PI / 2);
        csgDoorGap.union([walls[1]]);
        csgDoorGap.subtract([meshDoorGap]);
        walls[1] = csgDoorGap.toMesh();

        // Mesh del techo
        var ceiling = new THREE.Mesh(geomCeiling, matTecho);
        ceiling.receiveShadow = true;
        
        // Jerarquia de los limites de la habitacion
        this.add(floor);
        this.add(ceiling);
        for (let i=0; i < geomWalls.length; i++) {
            this.add(walls[i]);
            walls[i].receiveShadow = true;
        }

        // --- Añadimos los objetos restantes a la habitación

        // Cama
        var bed = new Bed();
        bed.translateZ(-140);
        this.add(bed);
        this.pickable.push(bed);

        // Mesita de noche
        var bedside = new BedsideTable();
        bedside.translateX(80);
        bedside.translateZ(-210);
        this.add(bedside);
        this.pickable.push(bedside);

        // Armario
        var closet = new Closet();
        closet.translateX(-100);
        closet.translateZ(210);
        closet.rotateY(Math.PI);
        this.add(closet);
        this.pickable.push(closet);

        // Ventilador
        var fan = new Fan();
        fan.castShadow = true;
        fan.name = "fan";
        fan.translateX(10);
        fan.translateY(52.5);
        fan.translateZ(-10);
        fan.rotateY(-Math.PI / 1.5);
        bedside.add(fan); // El ventilador esta sobre la mesita de noche
        this.pickable.push(fan);

        // Cuadros
        var paintingPrimarios = new Painting("../../imgs/sample_canvas.png");
        paintingPrimarios.translateX(-245);
        paintingPrimarios.translateY(160);
        paintingPrimarios.translateZ(-100);
        paintingPrimarios.rotateY(-Math.PI / 2);
        this.add(paintingPrimarios);

        var paintingLlaves = new Painting("../../imgs/llaves.png");
        paintingLlaves.translateX(245);
        paintingLlaves.translateY(180);
        paintingLlaves.translateZ(100);
        paintingLlaves.rotateY(Math.PI / 2);
        this.add(paintingLlaves);

        // Puerta
        var door = new Door();
        door.name = "door";
        this.add(door);
        door.translateX(252);
        door.translateZ(-50);
        door.rotateY(-Math.PI / 2); // Para abrir, reducir el denominador
        this.pickable.push(door);

        // Escritorio
        var desktop = new Desktop();
        desktop.name = "desktop";
        desktop.translateX(100);
        desktop.translateZ(200);
        this.add(desktop);

        // Añadimos un foco al escritorio que vaya cambiando de vez en cuando
        this.focoAlEscritorio = new THREE.SpotLight(0xffaaaa, 1, 800, Math.PI / 6, 0.3, 2);
        this.focoAlEscritorio.position.set(0,230,0);
        this.focoAlEscritorio.target = desktop;
        this.add(this.focoAlEscritorio);

        // Hojas de papel
        var hojaCalificaciones = new PaperSheet('../../imgs/hoja_calificaciones.png');
        hojaCalificaciones.translateY(5);
        hojaCalificaciones.translateX(-40);
        hojaCalificaciones.rotateY(-0.1);
        desktop.add(hojaCalificaciones);

        var hojaTrabajo = new PaperSheet('../../imgs/hoja_trabajo.png');
        hojaTrabajo.translateY(5);
        hojaTrabajo.rotateY(-0.2);
        desktop.add(hojaTrabajo);

        var hojaPista = new PaperSheet('../../imgs/hoja_pista.png');
        hojaPista.translateY(5);
        hojaPista.translateX(40);
        hojaPista.rotateY(0.1);
        desktop.add(hojaPista);

        // Silla
        var chair = new Chair();
        this.add(chair);
        chair.translateX(100);
        chair.translateZ(150);
        chair.rotateY(-0.5);

        this.rainbowPuzzle = new RainbowPuzzle();
        this.rainbowPuzzle.translateY(60);   
        this.pickable.push(this.rainbowPuzzle);
        closet.add(this.rainbowPuzzle);

        this.simplePuzzle = new SimplePuzzle();
        this.simplePuzzle.translateY(11);
        this.pickable.push(this.simplePuzzle);
        bedside.cajonAbajo.add(this.simplePuzzle);

        var riddlePainting = new RiddlePuzzle();
        riddlePainting.fan = fan;
        riddlePainting.translateY(170);
        riddlePainting.translateZ(-245);
        riddlePainting.rotateY(-Math.PI);
        this.pickable.push(riddlePainting);
        this.add(riddlePainting);

        door.puzzles.push(this.rainbowPuzzle);
        door.puzzles.push(this.simplePuzzle);
        door.puzzles.push(riddlePainting);

        this.setUpAnimations();

    }

    setUpAnimations() {

        var inicio = { intensity: 1 };
        var fin = { intensity: 0 };
        this.animacionLuz = new TWEEN.Tween(inicio).to(fin, 2000);
        this.animacionLuz.easing(TWEEN.Easing.Bounce.In);
        this.animacionLuz.onUpdate(() => {
            this.focoAlEscritorio.intensity = inicio.intensity;
        });
        this.animacionLuz.onComplete(() => {
            inicio.intensity = 1;
        });
        this.animacionLuz.yoyo(true);
        this.animacionLuz.repeat(Infinity);
        this.animacionLuz.start();

    }

    update() {

        TWEEN.update();

        this.pickable.forEach(
            (objeto) => {
                objeto.update();
            }
        );

    }
}
export { Room }