import * as THREE from '../libs/three.module.js'

class Icosahedron extends THREE.Object3D {
    constructor(gui, titleGui) {
        super();
        this.createGUI(gui, titleGui);
        var geometry = new THREE.IcosahedronGeometry();
        var material = new THREE.MeshPhongMaterial({color: 0x0090FF});
        var object = new THREE.Mesh(geometry, material);
        this.add(object);
        object.position.y = 0.5;
    }

    createGUI(gui, titleGui) {
        this.guiControls = {
            visible : true,
            radius : 1,
            detail : 0,

            reset : () => {
                this.guiControls.radius = 1;
                this.guiControls.detail = 0;
            }
        }

        var folder = gui.addFolder(titleGui);

        folder.add(this.guiControls, 'visible').name('Visible: ').listen();
        folder.add(this.guiControls, 'radius', 0.1, 5, 0.1).name('Tamaño: ').listen();
        folder.add(this.guiControls, 'detail', 0, 3, 1).name('Detalle: ').listen();
        folder.add(this.guiControls, 'reset').name('[ Reset ]').listen();
    }

    update() {
        if (this.children[0].visible != this.guiControls.visible) {
            this.children[0].visible = this.guiControls.visible;
        }
        if (this.children[0].visible) {
            this.rotation.y += 0.01;
        }
        this.children[0].geometry = new THREE.IcosahedronGeometry(
            this.guiControls.radius, this.guiControls.detail);
    }
}

export { Icosahedron };