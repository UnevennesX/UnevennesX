function processUrl(url) {
  try {
    const domain = new URL(url).hostname; // Obtener el dominio
    let generatedUrl = '';

    if (domain.includes('se.navigatorsurveys.com')) {
      // Obtener los parámetros de la URL
      const proj = new URL(url).searchParams.get('rd_proj_ud');
      const param = new URL(url).searchParams.get('s2');
      if (proj && param) {
        // Construir la URL generada
        generatedUrl = `https://www.rdsecured.com/return?inbound_code=1000&rdud=${param}&rd_proj_ud=${proj}`;
      } else {
        console.error('Faltan parámetros en la URL.');
        return null;
      }
    } else {
      return null; // Dominio no válido
    }
    return generatedUrl;
  } catch (e) {
    console.error('Error en la URL:', e);
    return null;
  }
}
