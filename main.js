// main.js

// Importar las funciones processUrl de cada archivo
import { processUrl as processUrlInterno } from './interno.js';
import { processUrl as processUrlNoctComun } from './noct-comun.js';
import { processUrl as processUrlSampleCube } from './sample-cube.js';
import { processUrl as processUrlRidToken } from './rid-token.js';
import { processUrl as processUrlNoctPocoComunes } from './noct-poco-comunes.js';
import { processUrl as processUrlNoctCint } from './noct-cint.js';
import { processUrl as processUrlInvite } from './invite.js';

// Función principal que decide qué función usar según la URL
function mainProcessUrl(url) {
  // Primero, intenta con la lógica de interno.js
  let result = processUrlInterno(url);
    if (result && result !== 'URL no válida' ) {
    return result;
  }
  
  // Si interno.js no procesa la URL, intenta con noct-comun.js
   result = processUrlNoctComun(url);
    if (result) {
    return result;
    }

   // Si noct-comun.js no procesa la URL, intenta con sample-cube.js
    result = processUrlSampleCube(url);
    if(result) {
        return result
    }


    // Si sample-cube.js no procesa la URL, intenta con rid-token.js
    result = processUrlRidToken(url);
    if(result) {
      return result
    }


    //Si rid-token.js no procesa la URL, intenta con noct-poco-comunes.js
    result = processUrlNoctPocoComunes(url);
      if (result) {
      return result;
      }


    //Si noct-poco-comunes.js no procesa la URL, intenta con noct-cint.js
    result = processUrlNoctCint(url);
    if(result) {
      return result;
    }


   //Si noct-cint.js no procesa la URL, intenta con invite.js
  result = processUrlInvite(url);
  if(result) {
    return result;
  }
  

  // Si ninguna función pudo procesar la URL, retorna 'URL no válida'
  return 'URL no válida';
}


// Event listener para el formulario (asumiendo que tienes un formulario con id 'urlForm' y un input con id 'urlInput')
document.getElementById('urlForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const urlInput = document.getElementById('urlInput');
    const result = mainProcessUrl(urlInput.value);
  
    if (result && result !== 'URL no válida' ) {
      document.getElementById('generatedTitle').classList.remove('hidden');
      document.getElementById('generatedUrl').classList.remove('hidden');
      document.getElementById('generatedUrl').innerText = result;
      document.getElementById('error').classList.add('hidden');
    } else {
      document.getElementById('generatedTitle').classList.add('hidden');
      document.getElementById('generatedUrl').classList.add('hidden');
      document.getElementById('error').classList.remove('hidden');
    }
});


// Event listener para el elemento 'generatedUrl' para copiar al portapapeles
document.getElementById('generatedUrl').addEventListener('click', function() {
    var el = document.createElement('textarea');
    el.value = this.innerText;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    document.getElementById('notification').classList.remove('hidden');
});
