function processUrl(url) {
  try {
    // Parsear la URL y obtener el dominio
    const parsedUrl = new URL(url);
    const domain = parsedUrl.hostname;

    // Validar el dominio
    if (domain.includes('se.navigatorsurveys.com')) {
      // Declarar y asignar las variables necesarias
      const rd_proj_ud = parsedUrl.searchParams.get('rd_proj_ud');
      const s2 = parsedUrl.searchParams.get('s2');

      // Construir la URL generada directamente
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

// Ejemplo de uso
const url = 'https://se.navigatorsurveys.com/api/survey/incoming/8dbe255b-d4dc-a31e-9e4c-fe59723866d4?list=3&lang=german&s2=90f42e00-4b57-4100-bd1e-0ebc86ca8693&rd_proj_ud=3b76b1be-e218-4b42-8cf6-ff9e5d17d3aa';
const result = processUrl(url);
console.log(result);
