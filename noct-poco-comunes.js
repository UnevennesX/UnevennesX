function processUrl(url) {
  try {
    // Verificamos si la URL es válida
    let parsedUrl;
    try {
      parsedUrl = new URL(url);
    } catch (error) {
      console.error('La URL no es válida:', url);
      return null;
    }

    console.log('URL válida:', parsedUrl.href); // Ver la URL completa

    let domain = parsedUrl.hostname; // Extraer el dominio de la URL
    console.log('Dominio extraído:', domain); // Ver el dominio extraído

    // Parámetros de la URL
    let pid1 = parsedUrl.searchParams.get('pid1');
    let refid1 = parsedUrl.searchParams.get('refid1');
    let rid = parsedUrl.searchParams.get('rid');
    console.log('Parámetros extraídos:', { pid1, refid1, rid }); // Ver los parámetros

    // Token de Notch
    let token = '04651664-4715-4620-8f59-16a272ff3e4a';
    let generatedUrl = '';

    // Verificar si el dominio es válido y si los parámetros son correctos
    if (domain.endsWith('ovationworldpanel.com') && pid1 && refid1 && rid) {
      // Generar la nueva URL con los parámetros obtenidos
      generatedUrl = `https://notch.insights.supply/cb?token=${token}&pid1=${pid1}&refid1=${refid1}&rid=${rid}`;
      console.log('URL generada:', generatedUrl);
    } else {
      console.error('Error: dominio no válido o parámetros faltantes');
      return null;
    }

    return generatedUrl; // Devolver la URL generada
  } catch (e) {
    console.error('Error en el procesamiento de la URL:', e);
    return null; // Si hay un error, retornar null
  }
}
