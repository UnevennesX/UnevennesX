//Perfecto//
function processUrl(url) {
  try {
    // Obtener el dominio y los parámetros
    let domain = new URL(url).hostname;
    let arid = new URL(url).pathname.split('/')[2]; // Extraer el 'ca2e3c3b-8aec-42b4-8d25-a430509add93'
    let rid = new URL(url).searchParams.get('RID'); // Extraer el 'RID'

    let generatedUrl = '';

    // Verificar si el dominio es el esperado
    if (domain.includes('router.cint.com') && arid && rid) {
      // Generar la nueva URL con los parámetros obtenidos
      let token = '0749a007-a1d3-48c1-8ff3-12960c555867';
      generatedUrl = `https://notch.insights.supply/cb?token=${token}&RID=${rid}&cint_arid=${arid}`;
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
  const result = processUrl(urlInput.value);

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
  
  // Mostrar la notificación
  const notification = document.getElementById('notification');
  notification.classList.remove('hidden');
  
  // Ocultar la notificación después de 5 segundos
  setTimeout(() => {
    notification.classList.add('hidden');
  }, 5000); // Ocultar después de 5 segundos
});

//Perfecto//
