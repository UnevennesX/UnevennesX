import { processUrl as processUrlSampleCube } from 'sample-cube.js';
import { processUrl as processUrlNoctComun } from 'noct-comun.js';
import { processUrl as processUrlRidToken } from 'rid-token.js';
import { processUrl as processUrlNoctCint } from 'noct-cint.js';
import { processUrl as processUrlInvite } from 'invite.js';
import { processUrl as processUrlNoctPocoComunes } from 'noct-poco-comunes.js';
import { processUrl as processUrlInterno } from 'interno.js';

function dispatchUrl(url) {
    if (url.includes('surveys.sago.com')) {
        const result = processUrlSampleCube(url);
        return result ? { url: result, provider: 'Sample-Cube' } : null;
    } else if (url.includes('qualtrics.com') || url.includes('questionlab.com') || url.includes('surveys.audience-align.com') || url.includes('insights.surveynavigate.app')) {
       const result = processUrlNoctComun(url);
        return result ? { url: result, provider: 'Samplicious' } : null;
    } else if (url.includes('lumen-research.com')) {
        const result = processUrlRidToken(url);
        return result ? { url: result, provider: 'Lumen Research' } : null;
    } else if (url.includes('router.cint.com')) {
      const result = processUrlNoctCint(url);
        return result ? { url: result, provider: 'Cint' } : null;
    } else if (url.includes('ovationworldpanel.com')) {
      const result = processUrlNoctPocoComunes(url);
        return result ? { url: result, provider: 'Ovation World Panel' } : null;
    } else if (url.includes('ipsosinteractive.com')) {
      const result = processUrlInvite(url);
        return result ? { url: result, provider: 'Ipsos Interactive' } : null;
    } else if (url.includes('tsid=') || url.includes('rd_proj_ud=') || url.includes('s2=') || url.includes('rdud=')) {
        const result = processUrlInterno(url);
        return result === 'URL no válida' ? null : {url: result, provider:'Interno'};
    }

    return null;
}

document.getElementById('urlForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const urlInput = document.getElementById('urlInput');
    const result = dispatchUrl(urlInput.value);

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
