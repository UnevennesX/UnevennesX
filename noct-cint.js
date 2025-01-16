/**
 * Extrae los parámetros de la URL proporcionada y genera la nueva URL.
 * @param {string} url - La URL de entrada.
 * @returns {string|null} - La nueva URL generada o null en caso de error.
 */
export function generateCintUrl(url) {
  try {
    // Verificar si la URL es válida
    let parsedUrl = new URL(url);
    let domain = parsedUrl.hostname;
    
    // Extraer el valor de 'ca2e3c3b-8aec-42b4-8d25-a430509add93' que viene después de 'ExternalRoute/'
    let arid = parsedUrl.pathname.split('/')[2];  // Toma lo que venga después de 'ExternalRoute/'
    let rid = parsedUrl.searchParams.get('RID'); // Extraer el parámetro 'RID'

    if (domain.includes('router.cint.com') && arid && rid) {
      // Crear la nueva URL con los parámetros obtenidos
      let token = '0749a007-a1d3-48c1-8ff3-12960c555867';
      let generatedUrl = `https://notch.insights.supply/cb?token=${token}&RID=${rid}&cint_arid=${arid}`;
      
      console.log('URL generada:', generatedUrl);
      return generatedUrl; // Retorna la URL generada
    } else {
      throw new Error('Parámetros faltantes o dominio no válido');
    }
  } catch (e) {
    console.error('Error al procesar la URL:', e);
    return null; // Retorna null si ocurre algún error
  }
}

/**
 * Maneja la interacción del formulario y muestra la URL generada.
 */
export function handleUrlFormSubmission() {
  document.getElementById('urlForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const urlInput = document.getElementById('urlInput');
    const result = generateCintUrl(urlInput.value);

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
}
