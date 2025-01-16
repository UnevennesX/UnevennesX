document.getElementById('urlForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const urlInput = document.getElementById('urlInput');
    const result = await processUrl(urlInput.value);

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
    const resultsContainer = document.getElementById('unevennesxResults');
    resultsContainer.innerHTML = ''
    const templates = await processUrlsFromTxt();

      if(templates.length > 0){
        templates.forEach(item => {
          const div = document.createElement('div');
            if(item.url === 'URL no valida'){
              div.innerHTML = `<p class="error"><strong>${item.name}:</strong> ${item.url}</p>`;
          } else{
              div.innerHTML = `<p><strong>${item.provider} - ${item.name}:</strong> <a id="unevennesxLink" href="#" >${item.url}</a></p>`;
             div.querySelector('#unevennesxLink').addEventListener('click', function() {
                   copyToClipboard(this.innerText);
                     this.classList.add('copied');
                  setTimeout(() => {
                    this.classList.remove('copied');
                    }, 1000);
                     });
          }
           resultsContainer.appendChild(div);
        });
     } else {
          resultsContainer.innerHTML = '<p>No se encontraron URLs válidas en el archivo de texto.</p>';
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
