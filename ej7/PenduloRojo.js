import * as THREE from '../libs/three.module.js'

class PenduloRojo extends THREE.Object3D {
    constructor(gui, titleGui) {
        super();
        
        // Declaración de geometrías
        var geomBaseParteRoja = new THREE.BoxGeometry(1, 1, 1);
        var geomExtremoParteRoja = new THREE.BoxGeometry(1, 1, 1);
        var geomEje = new THREE.CylinderGeometry(1, 1, 1);

        // Materiales
        var matRojo = new THREE.MeshPhongMaterial({color:0xff0000});
        var matVerde = new THREE.MeshPhongMaterial({color:0x00ff00});
        var matCyan = new THREE.MeshPhongMaterial({color:0xff00ff});

        // Meshes
        var baseRoja = new THREE.Mesh(geomBaseParteRoja, matRojo);
        var extremoSupParteRoja = new THREE.Mesh(geomExtremoParteRoja, matVerde);
        var extremoInfParteRoja = new THREE.Mesh(geomExtremoParteRoja, matVerde);
        var ejeParteRoja = new THREE.Mesh(geomEje, matCyan);

        // Traslaciones
        extremoInfParteRoja.position.set(0, -(4 + 5), 0);
        baseRoja.position.set(0, -(4/2 + 5/2), 0);

        // Rotaciones
        ejeParteRoja.rotation.set(Math.PI / 2, 0, 0);

        // Escalados
        baseRoja.scale.set(1,5,1);
        extremoSupParteRoja.scale.set(1,4,1);
        extremoInfParteRoja.scale.set(1,4,1);
        ejeParteRoja.scale.set(0.5,1.5,0.5);

        // Jerarquía
        baseRoja.name = 'baseRoja';
        extremoInfParteRoja.name = 'extremoInfParteRoja';
        extremoSupParteRoja.name = 'extremoSupParteRoja';
        ejeParteRoja.name = 'ejeParteRoja';
        this.add(baseRoja);
        this.add(extremoInfParteRoja);
        this.add(extremoSupParteRoja);
        this.add(ejeParteRoja);

        // GUI
        this.createGui(gui, titleGui);
    }

    createGui(gui, titleGui) {
        
        this.guiControls = {
            parteRojaLen: 5,
            parteRojaAng: 0,

            reset: () => {
                this.guiControls.parteRojaLen = 5;
                this.guiControls.parteRojaAng = 0;
            }
        };

        var folder = gui.addFolder(titleGui);

        folder.add(this.guiControls, 'parteRojaLen', 5, 10, 0.1).name('Longitud parte roja: ').listen();
        folder.add(this.guiControls, 'parteRojaAng', -Math.PI / 4, Math.PI / 4, Math.PI / 40).name('Giro parte roja: ').listen();
        folder.add(this.guiControls, 'reset').name('[ Reiniciar ]').listen();

    }

    update() {
        this.rotation.set(0, 0, this.guiControls.parteRojaAng);
        var baseRoja = this.getObjectByName('baseRoja');
        var extremoInf = this.getObjectByName('extremoInfParteRoja');
        baseRoja.scale.set(1, this.guiControls.parteRojaLen, 1);
        baseRoja.position.set(0, -(2 + this.guiControls.parteRojaLen/2), 0);
        extremoInf.position.set(0, -(4 + this.guiControls.parteRojaLen), 0);
    }
}

export { PenduloRojo }