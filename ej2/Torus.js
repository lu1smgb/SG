import * as THREE from '../libs/three.module.js'

class Torus extends THREE.Object3D {
    constructor(gui, titleGui) {
        super();
        this.createGUI(gui, titleGui);
        var geometry = new THREE.TorusGeometry();
        var material = new THREE.MeshPhongMaterial({color: 0x0090FF});
        var object = new THREE.Mesh(geometry, material);
        this.add(object);
        object.position.y = 0.5;
    }

    createGUI(gui, titleGui) {
        this.guiControls = {
            visible : true,
            radius : 1.6,
            tube : 0.1,
            radialSegments : 12,
            tubularSegments : 48,
            arc : 2 * Math.PI,

            reset : () => {
                this.guiControls.radius = 1.6;
                this.guiControls.tube = 0.1;
                this.guiControls.radialSegments = 12;
                this.guiControls.tubularSegments = 48;
                this.guiControls.arc = 2 * Math.PI;
            }
        }

        var folder = gui.addFolder(titleGui);

        folder.add(this.guiControls, 'visible').name('Visible: ').listen();
        folder.add(this.guiControls, 'radius', 0.1, 5, 0.1).name('Tamaño: ').listen();
        folder.add(this.guiControls, 'tube', 0.1, 5, 0.1).name('Grosor: ').listen();
        folder.add(this.guiControls, 'radialSegments', 2, 100, 1).name('Detalle radial: ').listen();
        folder.add(this.guiControls, 'tubularSegments', 2, 100, 1).name('Detalle tubular: ').listen();
        folder.add(this.guiControls, 'arc', 1, 2 * Math.PI, 0.001).name('Longitud: ').listen();
        folder.add(this.guiControls, 'reset').name('[ Reset ]');
    }

    update() {
        if (this.children[0].visible != this.guiControls.visible) {
            this.children[0].visible = this.guiControls.visible;
        }
        if (this.children[0].visible) {
            this.rotation.y += 0.01;
        }
        this.children[0].geometry = new THREE.TorusGeometry(
            this.guiControls.radius, this.guiControls.tube, this.guiControls.radialSegments, this.guiControls.tubularSegments, this.guiControls.arc);
    }
}

export { Torus };