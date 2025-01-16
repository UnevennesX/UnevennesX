import { processUrl as processUrlSampleCube } from 'sample-cube.js';
import { processUrl as processUrlNoctComun } from 'noct-comun.js';
import { processUrl as processUrlRidToken } from 'rid-token.js';
import { processUrl as processUrlNoctCint } from 'noct-cint.js';
import { processUrl as processUrlInvite } from 'invite.js';
import { processUrl as processUrlNoctPocoComunes } from 'noct-poco-comunes.js';
import { processUrl as processUrlInterno } from 'interno.js';

document.getElementById('urlForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const urlInput = document.getElementById('urlInput');
    let result = null;
    
      result = await processUrlSampleCube(urlInput.value)
      if(!result)  result = await processUrlNoctComun(urlInput.value);
      if(!result)  result = await processUrlRidToken(urlInput.value);
      if(!result)  result = await processUrlNoctCint(urlInput.value);
      if(!result)  result = await processUrlInvite(urlInput.value);
      if(!result)  result = await processUrlNoctPocoComunes(urlInput.value);
      if(!result)  result = await processUrlInterno(urlInput.value);

    if (result && result.url) {
      document.getElementById('generatedTitle').classList.remove('hidden');
      document.getElementById('generatedUrl').classList.remove('hidden');
      document.getElementById('generatedUrl').innerHTML = `<span class="survey-name">${result.provider}</span><br><p id="notchLink">${result.url}</p>`;
      
      document.getElementById('error').classList.add('hidden');

       copyToClipboard(result.url);

       document.getElementById('notchLink').addEventListener('click', function() {
         copyToClipboard(this.innerText);
         this.classList.add('copied');
         setTimeout(() => {
          this.classList.remove('copied');
        }, 1000)
       });
    } else {
      document.getElementById('generatedTitle').classList.add('hidden');
      document.getElementById('generatedUrl').classList.add('hidden');
      document.getElementById('error').classList.remove('hidden');
      document.getElementById('generatedUrl').innerHTML = 'URL no reconocida o no válida';
    }
});

document.getElementById('generatedUrl').addEventListener('click', function() {
    var el = document.createElement('textarea');
    el.value = this.innerText;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    document.getElementById('notification').classList.remove('hidden');
});
function copyToClipboard(url) {
  navigator.clipboard.writeText(url).then(() => {
    let notification = document.getElementById('notification');
    notification.classList.remove('hidden');
    notification.style.display = 'block'; // Mostrar mensaje inmediatamente
    setTimeout(() => {
      notification.style.display = 'none'; // Ocultar mensaje después de 20 segundos
    }, 20000);
  }).catch(() => {
    alert('Error al copiar al portapapeles');
  });
}
