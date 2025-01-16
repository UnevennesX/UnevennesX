import { processUrl as processUrlInterno } from 'interno.js';
import { processUrl as processUrlSampleCube } from 'sample-cube.js';
import { processUrl as processUrlNoctPocoComunes } from 'noct-poco-comunes.js';
import { processUrl as processUrlRidToken } from 'rid-token.js';
import { processUrl as processUrlInvite } from 'invite.js';
import { processUrl as processUrlNoctCint } from 'noct-cint.js';
import { processUrl as processUrlNoctComun } from 'noct-comun.js';

document.getElementById('urlForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const urlInput = document.getElementById('urlInput');
  const url = urlInput.value;
  let generatedUrl = null;

  // Intentar con cada función de procesamiento de URL en orden
  generatedUrl = processUrlInterno(url);
  if (generatedUrl && generatedUrl !== 'URL no válida') {
    displayResult(generatedUrl);
    return;
  }

  generatedUrl = processUrlSampleCube(url);
   if (generatedUrl) {
     displayResult(generatedUrl);
     return;
   }

  generatedUrl = processUrlNoctPocoComunes(url);
  if (generatedUrl) {
    displayResult(generatedUrl);
    return;
  }


  generatedUrl = processUrlRidToken(url);
   if (generatedUrl) {
     displayResult(generatedUrl);
     return;
   }


  generatedUrl = processUrlInvite(url);
  if (generatedUrl) {
    displayResult(generatedUrl);
    return;
  }

  generatedUrl = processUrlNoctCint(url);
  if (generatedUrl) {
      displayResult(generatedUrl);
      return;
  }

  generatedUrl = processUrlNoctComun(url);
    if (generatedUrl) {
        displayResult(generatedUrl);
        return;
    }


  // Si ninguna función pudo generar una URL, mostrar error
  displayError();

});

function displayResult(url) {
  document.getElementById('generatedTitle').classList.remove('hidden');
  document.getElementById('generatedUrl').classList.remove('hidden');
  document.getElementById('generatedUrl').innerText = url;
  document.getElementById('error').classList.add('hidden');

  copyToClipboard(url);
}


function displayError() {
  document.getElementById('generatedTitle').classList.add('hidden');
  document.getElementById('generatedUrl').classList.add('hidden');
  document.getElementById('error').classList.remove('hidden');
}
function copyToClipboard(url) {
  navigator.clipboard.writeText(url).then(() => {
      let notification = document.getElementById('notification');
      notification.classList.remove('hidden');
       notification.style.display = 'block'; // Mostrar mensaje inmediatamente
      setTimeout(() => {
      notification.style.display = 'none';
        }, 2000);
  }).catch(() => {
      alert('Error al copiar al portapapeles');
  });
}


document.getElementById('generatedUrl').addEventListener('click', function() {
    copyToClipboard(this.innerText);
  });
