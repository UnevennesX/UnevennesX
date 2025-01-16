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

      // Si ambos parámetros están presentes, se usará rdud
      if (s2 && rdud) {
        return `https://www.rdsecured.com/return?inbound_code=1000&rdud=${rdud}&rd_proj_ud=${rd_proj_ud}`;
      }

      // Si solo s2 está presente, usarlo
      if (s2) {
        return `https://www.rdsecured.com/return?inbound_code=1000&rdud=${s2}&rd_proj_ud=${rd_proj_ud}`;
      }

      // Si solo rdud está presente, usarlo
      if (rdud) {
        return `https://www.rdsecured.com/return?inbound_code=1000&rdud=${rdud}&rd_proj_ud=${rd_proj_ud}`;
      }

      // Si no se encuentra ni s2 ni rdud, usar el valor de rd_proj_ud sin uno de los otros parámetros
      return `https://www.rdsecured.com/return?inbound_code=1000&rd_proj_ud=${rd_proj_ud}`;
    }

    // Si el dominio no es el correcto, retornar null
    return null;
  } catch (e) {
    // Manejo de errores: Si la URL es inválida, imprimir el error
    console.error('Error en la URL:', e.message);
    return null;
  }
}






