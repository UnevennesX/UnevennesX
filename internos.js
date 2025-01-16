function processUrl(url) {
  try {
    let domain = new URL(url).hostname;
    let s2 = new URL(url).searchParams.get('s2');
    let rd_proj_ud = new URL(url).searchParams.get('rd_proj_ud');
    let rdud = new URL(url).searchParams.get('rdud');
    let generatedUrl = '';

    // Verificar si el dominio es el esperado
    if (domain.includes('navigatorsurveys.com')) {
      // Generar la nueva URL con los parámetros obtenidos
      if (rd_proj_ud) {
        generatedUrl = `https://www.rdsecured.com/return?inbound_code=1000&rd_proj_ud=${rd_proj_ud}`;
        if (rdud) generatedUrl += `&rdud=${rdud}`;
        if (s2) generatedUrl += `&s2=${s2}`;
      } else {
        throw new Error('El parámetro "rd_proj_ud" es obligatorio.');
      }
    } else {
      throw new Error('URL no válida');
    }

    return generatedUrl;
  } catch (e) {
    console.error('Error:', e.message); // Log de error para depuración
    return null;
  }
}

document.getElementById('urlForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Evitar recarga de la página

  const urlInput = document.getElementById('urlInput').value;
  const result = processUrl(urlInput);

  if (result) {
    // Mostrar la URL generada
    document.getElementById('generatedTitle').classList.remove('hidden');
    document.getElementById('generatedUrl').classList.remove('hidden');
    document.getElementById('generatedUrl').innerText = result;
    document.getElementById('error').classList.add('hidden');
  } else {
    // Mostrar el mensaje de error
    document.getElementById('generatedTitle').classList.add('hidden');
    document.getElementById('generatedUrl').classList.add('hidden');
    document.getElementById('error').classList.remove('hidden');
  }
});

// Copiar la URL generada al portapapeles
document.getElementById('generatedUrl').addEventListener('click', function() {
  const el = document.createElement('textarea');
  el.value = this.innerText;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);

  document.getElementById('notification').classList.remove('hidden');
});
