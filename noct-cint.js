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

      // Mostrar notificación de éxito
      showNotification('¡URL generada y copiada automáticamente!', 'success');

      // Copiar URL al portapapeles
      copyToClipboard(generatedUrl);
    } else {
      throw new Error('URL no válida');
    }

    return generatedUrl;
  } catch (e) {
    // Mostrar notificación de error
    showNotification('¡URL no válida o incompleta!', 'error');
    return null;
  }
}

// Función para copiar texto al portapapeles
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).catch(() => {
    showNotification('Error al copiar al portapapeles', 'error');
  });
}

// Función para mostrar notificaciones
function showNotification(message, type) {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;

  // Estilos dinámicos de la notificación
  notification.style.position = 'fixed';
  notification.style.bottom = '20px';
  notification.style.right = '20px';
  notification.style.backgroundColor = type === 'success' ? '#4caf50' : '#f44336';
  notification.style.color = 'white';
  notification.style.padding = '10px';
  notification.style.borderRadius = '5px';
  notification.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.3)';
  notification.style.zIndex = '1000';

  // Agregar la notificación al DOM
  document.body.appendChild(notification);

  // Remover la notificación después de 20 segundos
  setTimeout(() => {
    document.body.removeChild(notification);
  }, 20000);
}

// Función para alternar la lista de dominios permitidos
function toggleList() {
  const domains = document.querySelector('.allowed-domains');
  domains.classList.toggle('open');
}
