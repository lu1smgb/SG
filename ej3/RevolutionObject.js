import * as THREE from '../libs/three.module.js'

class RevolutionObject extends THREE.Object3D {
    constructor(gui, titleGui) {
        super();
        this.createGUI(gui,titleGui);

        // Definimos el perfil del objeto
        var points = [];
        // Declaramos los puntos como variable de instancia para poder usarlo en el update
        this.points = points;
        // IMPORTANTE QUE EL PERFIL COMIENCE EN EL 0,0
        points.push(new THREE.Vector2(0,0));
        points.push(new THREE.Vector2(1,0));
        points.push(new THREE.Vector2(1,0.1));
        points.push(new THREE.Vector2(0.1,1));
        points.push(new THREE.Vector2(0.1,3));
        points.push(new THREE.Vector2(1,3));
        points.push(new THREE.Vector2(0.5,4));
        points.push(new THREE.Vector2(0,4));

        // Dibujamos la linea del perfil
        var lineGeometry = new THREE.BufferGeometry();
        var lineMaterial = new THREE.LineBasicMaterial( {color: 0xffffff});
        lineGeometry.setFromPoints(points);
        var line = new THREE.Line (lineGeometry, lineMaterial);
        this.add(line);
        // this.add(new THREE.AxesHelper(5));

        // Ahora definimos el objeto por revolución
        var objectMaterial = new THREE.MeshNormalMaterial();
        var latheObject = new THREE.Mesh(new THREE.LatheGeometry(points), objectMaterial);
        this.add(latheObject);
    }

    createGUI(gui, titleGui) {
        this.guiControls = {
            profile: true,
            segments: 20,
            phiLength: 2*Math.PI,

            reset : () => {
                this.guiControls.profile = false;
                this.guiControls.segments = 20;
                this.guiControls.phiLength = 2 * Math.PI;
            }
        }

        var folder = gui.addFolder(titleGui);
        folder.add(this.guiControls, 'profile').name('Perfil: ').listen();
        folder.add(this.guiControls, 'segments', 3, 30, 1).name('Segmentos: ').listen();
        folder.add(this.guiControls, 'phiLength', 0, 2 * Math.PI, 0.1).name('Ángulo: ').listen();
        folder.add(this.guiControls, 'reset').name('[ Reset ]').listen();
    }

    update(gui, titleGui) {

        // Activar/desactivar el perfil
        this.children[0].visible = this.guiControls.profile;

        // Redibujamos el objeto
        this.children[1] = new THREE.Mesh(
            new THREE.LatheGeometry(this.points, this.guiControls.segments, 0, this.guiControls.phiLength),
            new THREE.MeshNormalMaterial()
        );
    }
}

export { RevolutionObject }