import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideServiceWorker } from '@angular/service-worker';
import { isDevMode } from '@angular/core'; // El componente raíz

bootstrapApplication(AppComponent, {
    providers: [provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
    }), provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
    })]
})
  .catch(err => console.error(err));

  let deferredPrompt: any;
  let installButton: HTMLElement | null;

  // Escuchar el evento `beforeinstallprompt`
  window.addEventListener('beforeinstallprompt', (event) => {
    // Evitar que el navegador muestre el prompt automáticamente
    event.preventDefault();

    // Guardar el evento para que pueda ser disparado más tarde
    deferredPrompt = event;

    // Mostrar el botón de instalación
    installButton = document.getElementById('installButton');
    if (installButton) {
      installButton.style.display = 'block';

      // Agregar el evento click al botón de instalación
      installButton.addEventListener('click', () => {
        // Mostrar el prompt de instalación
        deferredPrompt.prompt();

        // Manejar la elección del usuario
        deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('El usuario aceptó instalar la PWA');
          } else {
            console.log('El usuario rechazó instalar la PWA');
          }
          // Limpiar el deferredPrompt
          deferredPrompt = null;
        });
      });
    }
  });

  // Escuchar el evento `appinstalled` cuando la app está instalada
  window.addEventListener('appinstalled', () => {
    console.log('¡Aplicación instalada con éxito!');
  });
