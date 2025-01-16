// Función para procesar la URL
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

    document.getElementById('urlForm').addEventListener('submit', function(event) {
      event.preventDefault();
      let url = document.getElementById('urlInput').value;
      let generatedUrl = processUrl(url);

      if (generatedUrl) {
        document.getElementById('generatedUrl').textContent = generatedUrl;
        document.getElementById('generatedUrl').classList.remove('hidden');
        setTimeout(() => {
          document.getElementById('generatedUrl').classList.add('hidden');
        }, 20000); // Limpiar datos después de 20 segundos

        copyToClipboard(generatedUrl);
        document.getElementById('error').classList.add('hidden');
      } else {
        document.getElementById('generatedUrl').textContent = 'URL no reconocida o no válida';
        document.getElementById('generatedUrl').classList.remove('hidden');
        document.getElementById('error').classList.remove('hidden');
      }
    });

    // Limpiar el campo de entrada cada 20 segundos
    setInterval(() => {
      document.getElementById('urlInput').value = '';
    }, 20000);

    // Recargar la página cada 3 minutos (si es necesario)
    setInterval(() => {
      location.reload();
    }, 180000);

    // Toggle para la lista de dominios permitidos
    function toggleList() {
      const container = document.querySelector('.allowed-domains');
      const toggleText = document.getElementById('toggleText');
      container.classList.toggle('open');
      toggleText.textContent = container.classList.contains('open') ? '' : '';
    }
