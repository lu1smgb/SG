import * as THREE from '../libs/three.module.js'

class Cone extends THREE.Object3D {
    constructor(gui, titleGui) {
        super();
        this.createGUI(gui,titleGui);
        var geometry = new THREE.ConeGeometry(1,1,10);
        var material = new THREE.MeshPhongMaterial({color: 0x0090FF});
        var object = new THREE.Mesh(geometry, material);
        this.add(object);
        object.position.y = 1;
    }

    createGUI(gui, titleGui) {
        this.guiControls = {
            visible : true,
            radius : 1,
            height : 2,
            radialSegments : 10,

            reset : () => {
                this.visible = true;
                this.guiControls.radius = 1;
                this.guiControls.height = 2;
                this.guiControls.radialSegments = 10;
            }
        }

        var folder = gui.addFolder(titleGui);

        folder.add(this.guiControls, 'visible').name('Visible: ').listen();
        folder.add(this.guiControls, 'radius', 0.1, 5, 0.1).name('Radio : ').listen();
        folder.add(this.guiControls, 'height', 0.1, 10, 0.1).name('Altura: ').listen();
        folder.add(this.guiControls, 'radialSegments', 3, 30, 1).name('Resolución: ').listen();
        folder.add(this.guiControls, 'reset').name('[ Reset ]');
    }

    update() {
        this.children[0].visible = this.guiControls.visible;
        this.children[0].geometry = new THREE.ConeGeometry(this.guiControls.radius, this.guiControls.height, this.guiControls.radialSegments);
    }
}

export { Cone };