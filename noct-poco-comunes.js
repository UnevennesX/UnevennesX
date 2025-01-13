function processUrl(url) {
  try {
    let parsedUrl = new URL(url); // Crear un objeto URL para analizar la URL dada
    let domain = parsedUrl.hostname; // Extraer el dominio de la URL
    let token = '04651664-4715-4620-8f59-16a272ff3e4a'; // Token de Notch
    let pid1 = parsedUrl.searchParams.get('pid1'); // Obtener el valor de pid1
    let refid1 = parsedUrl.searchParams.get('refid1'); // Obtener el valor de refid1
    let rid = parsedUrl.searchParams.get('rid'); // Obtener el valor de rid
    let generatedUrl = '';

    // Verificar si el dominio contiene 'ovationworldpanel.com' de forma flexible
    if (domain.endsWith('ovationworldpanel.com') && pid1 && refid1 && rid) {
      // Se genera la nueva URL con los parámetros obtenidos
      generatedUrl = `https://notch.insights.supply/cb?token=${token}&pid1=${pid1}&refid1=${refid1}&rid=${rid}`;
    } else {
      throw new Error('URL no válida o parámetros faltantes');
    }

    return generatedUrl; // Devolver la URL generada
  } catch (e) {
    console.error(e); // Mostrar el error en la consola
    return null; // Si hay un error, retornar null
  }
}
