function processUrl(url) {
  try {
    // Parsear la URL y obtener el dominio
    const parsedUrl = new URL(url);
    const domain = parsedUrl.hostname;

    // Validar el dominio y construir la URL generada
    if (domain.includes('se.navigatorsurveys.com')) {
      let rd_proj_ud = parsedUrl.searchParams.get('rd_proj_ud');
      let s2 = parsedUrl.searchParams.get('s2');
      
      // Construir la URL directamente
      return `https://www.rdsecured.com/return?inbound_code=1000&rdud=${s2}&rd_proj_ud=${rd_proj_ud}`;
    }

    // Si el dominio no coincide, devuelve null
    return null;
  } catch (e) {
    // Manejo de errores
    console.error('Error en la URL:', e.message);
    return null;
  }
}
