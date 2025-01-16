function processUrl(url) {
  try {
    // Verifica si la URL es válida
    const parsedUrl = new URL(url);
    const domain = parsedUrl.hostname;
    const s2 = parsedUrl.searchParams.get('s2');
    const rd_proj_ud = parsedUrl.searchParams.get('rd_proj_ud');
    const rdud = parsedUrl.searchParams.get('rdud');

    let generatedUrl = '';

    // Verificar si el dominio es el esperado
    if (domain.includes('navigatorsurveys.com')) {
      if (rd_proj_ud) {
        // Crear la URL dependiendo de los parámetros disponibles
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
    console.error('Error:', e.message);  // Log de error en la consola para depuración
    return null;
  }
}

document.getElementById('urlForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Evitar que el formulario recargue la página

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
