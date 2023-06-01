// Clases de la biblioteca

import * as THREE from '../libs/three.module.js'
import { GUI } from '../libs/dat.gui.module.js'
import { Stats } from '../libs/stats.module.js'
import * as KeyCode from '../libs/keycode.esm.js';

// Clases de mi proyecto

import { Room } from './objects/Room.js'
import { PointerLockControls } from '../libs/PointerLockControls.js'

class MyScene extends THREE.Scene {
  constructor (myCanvas) {
    super();
    
    this.renderer = this.createRenderer(myCanvas);
    
    // this.initStats();

    this.moveFactor = 5;
    
    this.createCamera ();

    this.mouse = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();
    
    // Por último creamos el modelo.
    // El modelo puede incluir su parte de la interfaz gráfica de usuario. Le pasamos la referencia a 
    // la gui y el texto bajo el que se agruparán los controles de la interfaz que añada el modelo.
    this.room = new Room();
    this.add(this.room);

  }
  
  initStats() {
  
    var stats = new Stats();
    
    stats.setMode(0); // 0: fps, 1: ms
    
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    
    $("#Stats-output").append( stats.domElement );
    
    this.stats = stats;
  }
  
  createCamera () {
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 3000);
    this.camera.position.set (100, 150, -100);
    var look = new THREE.Vector3 (0,100,-150);
    this.camera.lookAt(look);
    this.add (this.camera);

    this.cameraControl = new PointerLockControls(this.camera, this.renderer.domElement);
    this.cameraControl.connect();
  }

  onKeyDown (event) {
    var tecla = event.keyCode || event.which;
    switch (tecla) {
      case KeyCode.KEY_W:
        this.cameraControl.moveForward(this.moveFactor);
        break;
      case KeyCode.KEY_A:
        this.cameraControl.moveRight(-this.moveFactor);
        break;
      case KeyCode.KEY_S:
        this.cameraControl.moveForward(-this.moveFactor);
        break;
      case KeyCode.KEY_D:
        this.cameraControl.moveRight(this.moveFactor);
        break;
      case KeyCode.KEY_CONTROL:
        if (this.cameraControl.isLocked) {
          this.cameraControl.unlock();
        }
        else {
          this.cameraControl.lock();
        }
        break;
    }
  }

  getMousePosition(event) {

    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = 1 - 2 * (event.clientY / window.innerHeight);

  }

  updateRaycaster() {

    this.raycaster.setFromCamera(this.mouse, this.camera);

  }

  onDocumentMouseDown(event) {

    if (!this.cameraControl.isLocked) {

        this.getMousePosition(event);
        this.updateRaycaster();

        var pickedObject = this.raycaster.intersectObjects(this.room.pickable)[0];
        if (pickedObject.distance <= 250) {
            var meshClicado = pickedObject.object;
            meshClicado.userData.pickAction(meshClicado);
        }

    }

  }
  
  createRenderer (myCanvas) {
    var renderer = new THREE.WebGLRenderer();
    
    renderer.setClearColor(new THREE.Color(0x000000), 1.0);
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    $(myCanvas).append(renderer.domElement);
    
    return renderer;  
  }
  
  setCameraAspect (ratio) {
    this.camera.aspect = ratio;
    this.camera.updateProjectionMatrix();
  }
  
  onWindowResize () {
    this.setCameraAspect (window.innerWidth / window.innerHeight);
    this.renderer.setSize (window.innerWidth, window.innerHeight);
  }

  update () {
    
    if (this.stats) this.stats.update();

    this.room.pickable.forEach(
      (object) => object.update()
    );
    
    this.renderer.render (this, this.camera);

    // Este método debe ser llamado cada vez que queramos visualizar la escena de nuevo.
    // Literalmente le decimos al navegador: "La próxima vez que haya que refrescar la pantalla, llama al método que te indico".
    // Si no existiera esta línea,  update()  se ejecutaría solo la primera vez.
    requestAnimationFrame(() => this.update())
  }
}

/// La función   main
$(function () {
  
  // Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
  var scene = new MyScene("#WebGL-output");

  // Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se modifica el tamaño de la ventana de la aplicación.
  window.addEventListener ("resize", () => scene.onWindowResize());
  window.addEventListener ("keydown", (event) => scene.onKeyDown(event));
  window.addEventListener ("mousedown", (event) => scene.onDocumentMouseDown(event));

  // Que no se nos olvide, la primera visualización.
  scene.update();
});
