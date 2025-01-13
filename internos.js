function processUrl(url) {
  try {
    // Parsear la URL y obtener el dominio
    const parsedUrl = new URL(url);
    const domain = parsedUrl.hostname;

    // Validar el dominio
    if (domain.includes('se.navigatorsurveys.com')) {
      // Extraer los parámetros necesarios
      const proj = parsedUrl.searchParams.get('rd_proj_ud');
      const param = parsedUrl.searchParams.get('s2');

      // Construir la URL generada directamente
      const generatedUrl = `https://www.rdsecured.com/return?inbound_code=1000&rdud=${s2}&rd_proj_ud=${proj}`;
      return generatedUrl;
    }

    // Si el dominio no coincide, devuelve null
    return null;
  } catch (e) {
    // Manejo de errores
    console.error('Error en la URL:', e.message);
    return null;
  }
}
