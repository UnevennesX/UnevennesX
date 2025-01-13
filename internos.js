function processUrl(url) {
  try {
    const domain = new URL(url).hostname;
    let generatedUrl = '';

    if (domain.includes('se.navigatorsurveys.com')) {
      const proj = new URL(url).searchParams.get('rd_proj_ud');
      const param = new URL(url).searchParams.get('s2');
      if (proj && param) { // Verifica que ambos parámetros existen
        generatedUrl = `https://www.rdsecured.com/return?inbound_code=1000&rdud=${param}&rd_proj_ud=${proj}`;
      } else {
        console.error('Faltan parámetros en la URL.');
        return null;
      }
    } else {
      return null; // Manejo de otros dominios
    }
    return generatedUrl;
  } catch (e) {
    console.error('Error en la URL:', e);
    return null;
  }
}

// Ejemplo de uso
const url = 'https://se.navigatorsurveys.com/survey?rd_proj_ud=12345&s2=abcde';
console.log(processUrl(url));
