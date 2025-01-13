function processUrl(url) {
  try {
    // Crear un objeto URL para analizar la URL dada
    const parsedUrl = new URL(url);

    // Verificar si el dominio es el que nos interesa
    if (parsedUrl.hostname.includes('se.navigatorsurveys.com')) {
      // Obtener los parámetros 's2' y 'rd_proj_ud'
      const s2 = parsedUrl.searchParams.get('s2');
      const rd_proj_ud = parsedUrl.searchParams.get('rd_proj_ud');

      // Validar que solo uno de los dos parámetros esté presente
      if (s2 && !rd_proj_ud) {
        // Si solo s2 está presente, usarlo como rdud
        return `https://www.rdsecured.com/return?inbound_code=1000&rdud=${s2}&rd_proj_ud=${s2}`;
      } else if (!s2 && rd_proj_ud) {
        // Si solo rd_proj_ud está presente, usarlo como rdud
        return `https://www.rdsecured.com/return?inbound_code=1000&rdud=${rd_proj_ud}&rd_proj_ud=${rd_proj_ud}`;
      } else {
        // Si ambos o ninguno están presentes, retornar null
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
