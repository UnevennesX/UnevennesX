document.getElementById('urlForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const urlInput = document.getElementById('urlInput');
    let result = null;
    
     if (urlInput.value.includes('surveys.sago.com')) {
        result =  processUrlSampleCube(urlInput.value);
    } else if (urlInput.value.includes('qualtrics.com') || urlInput.value.includes('questionlab.com') || urlInput.value.includes('surveys.audience-align.com') || urlInput.value.includes('insights.surveynavigate.app')) {
       result = processUrlNoctComun(urlInput.value);
    } else if (urlInput.value.includes('lumen-research.com')) {
         result = processUrlRidToken(urlInput.value);
    } else if (urlInput.value.includes('router.cint.com')) {
       result = processUrlNoctCint(urlInput.value);
    } else if (urlInput.value.includes('ovationworldpanel.com')) {
         result = processUrlNoctPocoComunes(urlInput.value);
    } else if (urlInput.value.includes('ipsosinteractive.com')) {
      result = processUrlInvite(urlInput.value);
    } else if (urlInput.value.includes('tsid=') || urlInput.value.includes('rd_proj_ud=') || urlInput.value.includes('s2=') || urlInput.value.includes('rdud=')) {
       result = processUrlInterno(urlInput.value);
    }

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
