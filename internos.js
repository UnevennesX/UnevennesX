function processDecipherUrl(url) {
  try {
    // Extraer el dominio y el parámetro tsid de la URL
    let domain = new URL(url).hostname;
    let tsid = new URL(url).searchParams.get('tsid'); // Extraer el valor de tsid

    let generatedUrl = '';

    // Verificar si la URL es de decipherinc.com
    if (domain.includes('decipherinc.com') && tsid) {
      // Generar la nueva URL con el parámetro tsid
      generatedUrl = `https://tssrvy.com/r/?st=1&tsid=${tsid}`;
    } else {
      throw new Error('URL no válida');
    }

    return generatedUrl;
  } catch (e) {
    return null;
  }
}

// Manejo del formulario y visualización de la URL generada
document.getElementById('urlForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const urlInput = document.getElementById('urlInput');
  const result = processDecipherUrl(urlInput.value);  // Usamos la nueva función

  // Mostrar la URL generada o error según corresponda
  if (result) {
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

// Copiar la URL generada al portapapeles
document.getElementById('generatedUrl').addEventListener('click', function() {
  var el = document.createElement('textarea');
  el.value = this.innerText;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  document.getElementById('notification').classList.remove('hidden');
});






