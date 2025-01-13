function processUrl(url) {
  try {
    // Crear un objeto URL para analizar la URL dada
    const parsedUrl = new URL(url);

    // Verificar si el dominio es el que nos interesa
    if (parsedUrl.hostname.includes('se.navigatorsurveys.com')) {
      // Obtener los parámetros 's2' y 'rd_proj_ud'
      const s2 = parsedUrl.searchParams.get('s2');
      const rd_proj_ud = parsedUrl.searchParams.get('rd_proj_ud');

      // Si el parámetro 's2' no existe, usar 'rd_proj_ud' como 'rdud'
      const rdud = s2 ? s2 : rd_proj_ud;

      // Verificar que al menos uno de los parámetros esté presente
      if (rdud && rd_proj_ud) {
        // Retornar la URL construida con los parámetros
        return `https://www.rdsecured.com/return?inbound_code=1000&rdud=${rdud}&rd_proj_ud=${rd_proj_ud}`;
      } else {
        // Si falta alguno de los parámetros, retornar null
        return null;
      }
    }

    // Si el dominio no es el correcto, retornar null
    return null;
  } catch (e) {
    // Manejo de errores: Si la URL es inválida, imprimir el error
    console.error('Error en la URL:', e.message);
    return null;
  }
}
