import * as THREE from '../../libs/three.module.js'

import { Fan } from './Fan/Fan.js';
import { BedsideTable } from './BedsideTable/BedsideTable.js';
import { Closet } from './Closet/Closet.js';
import { Bed } from './Bed/Bed.js';
import { ClosetDoor } from './Closet/ClosetDoor.js';
import { Pillow } from './Bed/Pillow.js';
import { Painting } from './Painting/Painting.js';
import { Mattress } from './Bed/Mattress.js';
import { CoatHangers } from './Closet/CoatHangers.js';

class Room extends THREE.Object3D {
    constructor(width=500,depth=500,height=250,gui,titleGui) {

        super();

        // ----- Geometria del suelo, paredes y techo -----
        // Geometria del suelo
        var geomFloor = new THREE.PlaneGeometry(width, depth);
        geomFloor.rotateX(-Math.PI / 2);

        // Geometria de las paredes
        var geomWalls = [];
        geomWalls.push(new THREE.PlaneGeometry(width, height));
        geomWalls[0].rotateY(Math.PI / 2);
        geomWalls[0].translate(-width / 2, 0, 0);
        geomWalls.push(new THREE.PlaneGeometry(width, height));
        geomWalls[1].rotateY(-Math.PI / 2);
        geomWalls[1].translate(width / 2, 0, 0);
        geomWalls.push(new THREE.PlaneGeometry(depth, height));
        geomWalls[2].translate(0, 0, -depth / 2);
        geomWalls.push(new THREE.PlaneGeometry(depth, height));
        geomWalls[3].rotateY(Math.PI);
        geomWalls[3].translate(0, 0, depth / 2);
        for (let i=0; i < geomWalls.length; i++) {
            geomWalls[i].translate(0, height / 2, 0);
        }

        // Geometria del techo
        var geomCeiling = new THREE.PlaneGeometry(width, depth);
        geomCeiling.rotateX(Math.PI / 2);
        geomCeiling.translate(0, height, 0);

        // TODO: Materiales
        // ----- Materiales -----
        var mat = new THREE.MeshPhysicalMaterial({ color: 0xc0c0c0 });

        // Mesh del suelo
        var floor = new THREE.Mesh(geomFloor, mat);
        
        // Meshes de las paredes
        var walls = [];
        for (let i=0; i < geomWalls.length; i++) {
            walls.push(new THREE.Mesh(geomWalls[i], mat));
        }

        // Mesh del techo
        var ceiling = new THREE.Mesh(geomCeiling, mat);
        
        // Estructura
        this.add(floor);
        this.add(ceiling);
        for (let i=0; i < geomWalls.length; i++) {
            this.add(walls[i]);
        }

        // Cama
        var bed = new Bed();
        bed.translateZ(-150);
        this.add(bed);

        // Mesita de noche
        var bedside = new BedsideTable();
        bedside.translateX(80);
        bedside.translateZ(-210);
        this.add(bedside);

        // Armario
        var closet = new Closet();
        closet.translateX(-100);
        closet.translateZ(220);
        closet.rotateY(Math.PI);
        this.add(closet);

        // Ventilador
        var fan = new Fan();
        fan.translateX(10);
        fan.translateY(52.5);
        fan.rotateY(-Math.PI / 1.5);
        bedside.add(fan); // El ventilador esta sobre la mesita de noche

        var painting1 = new Painting("../../../imgs/sample_canvas.png");
        painting1.translateX(-245);
        painting1.translateY(160);
        painting1.translateZ(-100);
        painting1.rotateY(-Math.PI / 2);
        this.add(painting1);

        var painting2 = new Painting("../../../imgs/sample_canvas.png");
        painting2.translateX(-245);
        painting2.translateY(160);
        painting2.translateZ(-160);
        painting2.rotateY(-Math.PI / 2);
        this.add(painting2);

    }
    createGui(gui, titleGui) {

        

    }

    update(gui, titleGui) {



    }
}
export { Room }