function processUrl(url) {
  try {
    // Verificar si la URL es válida
    const parsedUrl = new URL(url);
    let domain = parsedUrl.hostname;
    let s2 = parsedUrl.searchParams.get('s2');
    let rd_proj_ud = parsedUrl.searchParams.get('rd_proj_ud');
    let rdud = parsedUrl.searchParams.get('rdud');
    let generatedUrl = '';

    // Verificar si el dominio es 'se.navigatorsurveys.com'
    if (domain.includes('se.navigatorsurveys.com')) {
      // Asegurarse de que rd_proj_ud esté presente
      if (!rd_proj_ud) {
        throw new Error('El parámetro "rd_proj_ud" es obligatorio.');
      }

      // Generar la nueva URL con los parámetros obtenidos
      if (s2 && rdud) {
        generatedUrl = `https://www.rdsecured.com/return?inbound_code=1000&rdud=${rdud}&rd_proj_ud=${rd_proj_ud}`;
      } else if (s2) {
        generatedUrl = `https://www.rdsecured.com/return?inbound_code=1000&rdud=${s2}&rd_proj_ud=${rd_proj_ud}`;
      } else if (rdud) {
        generatedUrl = `https://www.rdsecured.com/return?inbound_code=1000&rdud=${rdud}&rd_proj_ud=${rd_proj_ud}`;
      } else {
        generatedUrl = `https://www.rdsecured.com/return?inbound_code=1000&rd_proj_ud=${rd_proj_ud}`;
      }
    } else {
      throw new Error('Dominio no válido');
    }

    return generatedUrl;
  } catch (e) {
    console.error('Error al procesar la URL:', e.message);
    return null;
  }
}

// Manejo del formulario y visualización de la URL generada
document.getElementById('urlForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const urlInput = document.getElementById('urlInput').value;
  const result = processUrl(urlInput); // Llamamos a la función processUrl

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
