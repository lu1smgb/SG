# Animación por recorridos

Implementación de objetos animados usando la librería `TWEEN`

- **`AnimatedObject`** 

    Objeto con una animación sencilla.

- **`ObjetoUno`**

    Hereda de `AnimatedObject`. Objeto que sigue un recorrido definido por un objeto `CatmullRomCurve3`

- **`ObjetoEjercicio`**

    Hereda de `AnimatedObject`. Objeto que sigue un recorrido y después sigue otro desde el final del primero. Este último es el que se ve en el fichero `index.html`