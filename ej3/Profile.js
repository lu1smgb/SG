import * as THREE from '../libs/three.module.js'

class Profile extends THREE.Object3D {
    constructor(gui, titleGui) {
        super();
        // Definimos el perfil del objeto
        var points = [];
        points.push (new THREE.Vector3 (0, 10, 0));
        points.push (new THREE.Vector3 (1, 9, 0));
        points.push (new THREE.Vector3 (2, 8, 0));
        points.push (new THREE.Vector3 (2, 7, 0));
        points.push (new THREE.Vector3 (1, 6, 0));
        points.push (new THREE.Vector3 (1, 5, 0));
        points.push (new THREE.Vector3 (2, 4, 0));
        points.push (new THREE.Vector3 (3, 3, 0));
        points.push (new THREE.Vector3 (4, 2, 0));
        points.push (new THREE.Vector3 (6, 1, 0));
        points.push (new THREE.Vector3 (6, 0, 0));
        points.push (new THREE.Vector3 (0, 0, 0));
        // Y la definimos para su renderizado
        var lineGeometry = new THREE.BufferGeometry();
        var lineMaterial = new THREE.LineBasicMaterial();
        lineGeometry.setFromPoints (points);
        var line = new THREE.Line (lineGeometry, lineMaterial);
        this.add(line);
        this.add(new THREE.AxesHelper(5));
        // Cambia la posición de todos los elementos
        this.position.x = -10;
        this.position.z = 10;
    }

    createGUI(gui, titleGui) {
        // nada
    }

    update(gui, titleGui) {
        // nada
    }

    getPoints() {
        return this.points;
    }
}

export { Profile }