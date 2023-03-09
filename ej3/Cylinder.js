import * as THREE from '../libs/three.module.js'

class Cylinder extends THREE.Object3D {
    constructor(gui, titleGui) {
        super();
        this.createGUI(gui,titleGui);
        var geometry = new THREE.CylinderGeometry(1,1,1,10);
        var material = new THREE.MeshPhongMaterial({color: 0x0090FF});
        var object = new THREE.Mesh(geometry, material);
        this.add(object);
        object.position.y = 1;
    }

    createGUI(gui, titleGui) {
        this.guiControls = {
            visible : true,
            radiusTop : 1,
            radiusBottom : 1,
            height : 2,
            radialSegments : 10,

            reset : () => {
                this.guiControls.radiusTop = 1;
                this.guiControls.radiusBottom = 1;
                this.guiControls.height = 2;
                this.guiControls.radialSegments = 10;
            }
        }

        var folder = gui.addFolder(titleGui);

        folder.add(this.guiControls, 'visible').name('Visible: ').listen();
        folder.add(this.guiControls, 'radiusTop', 0.1, 5, 0.1).name('Radio superior: ').listen();
        folder.add(this.guiControls, 'radiusBottom', 0.1, 5, 0.1).name('Radio inferior: ').listen();
        folder.add(this.guiControls, 'height', 0.1, 5, 0.1).name('Altura: ').listen();
        folder.add(this.guiControls, 'radialSegments', 3, 30, 1).name('Resolución: ').listen();
        folder.add(this.guiControls, 'reset').name('[ Reset ]');
    }

    update() {
        if (this.children[0].visible != this.guiControls.visible) {
            this.children[0].visible = this.guiControls.visible;
        }
        if (this.children[0].visible) {
            this.rotation.y += 0.01;
        }
        this.children[0].geometry = new THREE.CylinderGeometry(
            this.guiControls.radiusTop, this.guiControls.radiusBottom, this.guiControls.height, this.guiControls.radialSegments);
    }
}

export { Cylinder };