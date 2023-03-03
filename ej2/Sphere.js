import * as THREE from '../libs/three.module.js'

class Sphere extends THREE.Object3D {
    constructor(gui, titleGui) {
        super();
        this.createGUI(gui, titleGui);
        var geometry = new THREE.SphereGeometry(1,10,10);
        var material = new THREE.MeshPhongMaterial({color: 0x0090FF});
        var object = new THREE.Mesh(geometry, material);
        this.add(object);
        object.position.y = 0.5;
    }

    createGUI(gui, titleGui) {
        this.guiControls = {
            visible : false,
            radius : 1,
            widthSegments : 10,
            heightSegments : 10,

            reset : () => {
                this.guiControls.radius = 1;
                this.guiControls.widthSegments = 10;
                this.guiControls.heightSegments = 10;
            }
        }

        var folder = gui.addFolder(titleGui);

        folder.add(this.guiControls, 'visible').name('Visible: ').listen();
        folder.add(this.guiControls, 'radius', 0.1, 5, 0.1).name('Radio: ').listen();
        folder.add(this.guiControls, 'widthSegments', 3, 30, 1).name('Res. horizontal: ').listen();
        folder.add(this.guiControls, 'heightSegments', 2, 30, 1).name('Res. vectical: ').listen();
        folder.add(this.guiControls, 'reset').name('[ Reset ]').listen();
    }

    update() {
        if (this.children[0].visible != this.guiControls.visible) {
            this.children[0].visible = this.guiControls.visible;
        }
        if (this.children[0].visible) {
            this.rotation.y += 0.01;
        }
        this.children[0].geometry = new THREE.SphereGeometry(
            this.guiControls.radius, this.guiControls.widthSegments, this.guiControls.heightSegments);
    }
}

export { Sphere };