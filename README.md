# WhacAMoleBbva

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.17.
Si solo quieres jugar directamente, visita:

- https://ataa-ai.github.io/whac-a-mole-bbva/

# Descripción

Whac-A-Mole BBVA es un juego muy sencillo en el que aparece un topo aleatoriamente en una cuadrícula 3×3. El objetivo del jugador es “golpear” al topo antes de que se mueva. Cada topo acertado suma puntos según la dificultad seleccionada. Además, el juego almacena un historial de puntuaciones y soporta cinco idiomas (español, inglés, catalán, gallego y euskera).

# Características principales

Angular Standalone Components: Todos los componentes están creados como standalone, sin módulos adicionales, para aprovechar las últimas mejoras de Angular 17.

Sencilla lógica de juego:

- Pantalla de inicio (login) donde se elige nombre, dificultad e idioma.

- Contador regresivo (3…2…1) antes de empezar.

- Grid 3×3 que muestra un topo aleatorio cada intervalo.

- Cada “golpe” al topo suma puntos según dificultad.

- Botón de Play/Pause en el header para pausar o reanudar en cualquier momento.

- Al salir del juego se guarda la puntuación en historial (localStorage).

- Pantalla de puntuaciones: Muestra el top de partidas jugadas (nombre, dificultad, puntos, fecha).

- Internacionalización (i18n): Traducciones en español, inglés, catalán, gallego y euskera.

- Tests unitarios: Cobertura de tests con Jasmine y Karma para cada componente crítico.

# Tecnologías utilizadas

- Angular v17 (Standalone Components)

- TypeScript

- RxJS Signals para estado reactivo

- SCSS con metodología BEM y variables globales

- @ngx-translate/core para i18n

- Karma + Jasmine para tests unitarios

- Servidores de pruebas: Angular CLI (ng serve)

- GitHub Pages para despliegue continuo
