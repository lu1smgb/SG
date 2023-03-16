import * as THREE from '../libs/three.module.js'

class ExtrudeObject extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();
        this.createGui(gui, titleGui);

        // Dibujamos el contorno inicial
        var shape = new THREE.Shape();
        this.drawShape(shape, 'viga');

        // Camino de extrusión
        var path = new THREE.CatmullRomCurve3([
            new THREE.Vector3(-7.5, 1, -2),
            new THREE.Vector3(-5, 0, -1),
            new THREE.Vector3(-2.5, 0, 0),
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(2.5, 0.5, 1),
            new THREE.Vector3(5, 1, 2),
            new THREE.Vector3(7.5, 2, 1.5)
        ]);

        // Dibujamos el objeto con los valores por defecto
        var geometryOptions = {
            bevelEnabled: false,
            steps: path.points.length * 1, // Detalle del camino que sigue
            extrudePath: path // Sigue el camino especificado
        }
        var geometry = new THREE.ExtrudeGeometry(shape, geometryOptions);
        var material = new THREE.MeshNormalMaterial({
            flatShading: false,
            side: THREE.DoubleSide
        })
        var object = new THREE.Mesh(geometry, material);
        this.add(object);
    }

    drawShape(shape, option) {
        switch (option) {
            case 'viga':
                // TODO - Modificar coordenadas (no se encuentran en el origen de coordenadas)
                // * Viga con esquinas interiores redondeadas
                shape.moveTo(-2,-2);
                shape.lineTo(-2,-1);
                shape.lineTo(-1,-1);
                shape.lineTo(-1,1);
                shape.lineTo(-2,1);
                shape.lineTo(-2,2);
                shape.lineTo(2,2);
                shape.lineTo(2,1);
                shape.lineTo(1,1);
                shape.lineTo(1,-1);
                shape.lineTo(2,-1);
                shape.lineTo(2,-2);
                shape.lineTo(-2,-2);
                break;
            case 'trifuerza':
                var gap = 0.1
                shape.moveTo(-2,-2);
                shape.lineTo(0,2);
                shape.lineTo(2,-2);
                shape.lineTo(-2,-2);
                var hole = new THREE.Shape();
                hole.moveTo(-1 + gap, 0 - gap);
                hole.lineTo(1 - gap, 0 - gap);
                hole.lineTo(0, -2 + gap);
                hole.lineTo(-1 + gap, 0 - gap);
                shape.holes.push(hole);
                break;
            case 'camino':
                shape.moveTo(-2.1, 1);
                shape.lineTo(-2, 1);
                shape.bezierCurveTo(-2, 0, 2, 0, 2, 1);
                shape.lineTo(2.1, 1);
                shape.lineTo(2.1, 0);
                shape.quadraticCurveTo(2.1, -1, 0, -1);
                shape.quadraticCurveTo(-2.1,-1,-2.1,0);
                shape.lineTo(-2.1, 0);
                break;
            default:
                break;
        }
    }

    createGui(gui, titleGui) {

    }

    update(gui, titleGui) {

    }
}

export { ExtrudeObject }