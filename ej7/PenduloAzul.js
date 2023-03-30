import * as THREE from '../libs/three.module.js'

class PenduloAzul extends THREE.Object3D {
    constructor(gui,titleGui) {
        
        super();
        
        var geomPendulo = new THREE.BoxGeometry(1,1,1);
        var geomEje = new THREE.CylinderGeometry(1,1,1);

        var matPendulo = new THREE.MeshPhongMaterial({color: 0x0000ff});
        var matEje = new THREE.MeshPhongMaterial({color: 0xff00ff});

        var pendulo = new THREE.Mesh(geomPendulo, matPendulo);
        var eje = new THREE.Mesh(geomEje, matEje);

        pendulo.position.set(0,-4.5,0);

        eje.rotation.set(Math.PI / 2, 0, 0);

        pendulo.scale.set(1,10,0.5);
        eje.scale.set(0.5,1.5,0.5);

        pendulo.name = 'pendulo';
        eje.name = 'eje';
        this.add(pendulo);
        this.add(eje);

        this.createGui(gui, titleGui);

    }

    createGui(gui, titleGui) {

        this.guiControls = {
            penduloLen: 10,
            penduloRot: 0,

            reset: () => {
                this.guiControls.penduloLen = 10;
                this.guiControls.penduloRot = 0;
            }
        }

        var folder = gui.addFolder(titleGui);

        folder.add(this.guiControls, 'penduloLen', 10, 20, 0.5).name('Longitud: ').listen();
        folder.add(this.guiControls, 'penduloRot', -Math.PI / 4, Math.PI / 4, Math.PI / 40).name('Angulo: ').listen();

    }

    update(gui, titleGui) {
        var pendulo = this.getObjectByName('pendulo');
        var eje = this.getObjectByName('eje');
        pendulo.position.set(0,-(pendulo.scale.y/2) + (eje.scale.y/2),0);
        this.rotation.set(0,0,this.guiControls.penduloRot);
        pendulo.scale.set(1,this.guiControls.penduloLen,0.5);
    }
}
export { PenduloAzul }