function processUrl(url) {
  try {
    // Crear un objeto URL para analizar la URL dada
    const parsedUrl = new URL(url);

    // Verificar si el dominio es el que nos interesa
    if (parsedUrl.hostname.includes('se.navigatorsurveys.com')) {
      // Obtener los parámetros 's2', 'rd_proj_ud' y 'rdud'
      const s2 = parsedUrl.searchParams.get('s2');
      const rd_proj_ud = parsedUrl.searchParams.get('rd_proj_ud');
      const rdud = parsedUrl.searchParams.get('rdud'); // Buscar el parámetro rdud

      // Verificar que rd_proj_ud siempre esté presente
      if (!rd_proj_ud) {
        // Si no se encuentra rd_proj_ud, retornar null porque es obligatorio
        return null;
      }

      // Usar s2 como rdud si está presente, si no usar rdud (si lo encontramos)
      const rdudValue = s2 || rdud;

      // Si no tenemos ni s2 ni rdud, retornar null
      if (!rdudValue) {
        return null;
      }

      // Retornar la URL construida con los parámetros
      return `https://www.rdsecured.com/return?inbound_code=1000&rdud=${rdudValue}&rd_proj_ud=${rd_proj_ud}`;
    }

    // Si el dominio no es el correcto, retornar null
    return null;
  } catch (e) {
    // Manejo de errores: Si la URL es inválida, imprimir el error
    console.error('Error en la URL:', e.message);
    return null;
  }
}
