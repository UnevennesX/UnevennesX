function processSurveyUrl(url) {
  try {
    // Analizar la URL
    let domain = new URL(url).hostname;
    let generatedUrl = '';

    // Definir los parámetros de la URL
    let s2 = new URL(url).searchParams.get('s2');
    let rd_proj_ud = new URL(url).searchParams.get('rd_proj_ud');
    let rdud = new URL(url).searchParams.get('rdud');

    // Verificar si el dominio es de Survey
    if (domain.includes('se.navigatorsurveys.com')) {
      // Verificar que el parámetro rd_proj_ud esté presente
      if (!rd_proj_ud) {
        throw new Error('El parámetro "rd_proj_ud" es obligatorio.');
      }

      // Generar la nueva URL
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
    console.error('Error en la URL:', e.message);
    return null;
  }
}

// Manejo del formulario y visualización de la URL generada
document.getElementById('urlForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const urlInput = document.getElementById('urlInput');
  const result = processSurveyUrl(urlInput.value); // Usamos la función para Survey

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






