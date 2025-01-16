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

function toggleList() {
    const domains = document.querySelector('.allowed-domains');
    domains.classList.toggle('open');
}
