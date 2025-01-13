function processUrl(url) {
  try {
    let parsedUrl = new URL(url);
    let domain = parsedUrl.hostname;
    let token = '04651664-4715-4620-8f59-16a272ff3e4a'; // Token de Notch
    let pid1 = parsedUrl.searchParams.get('pid1');
    let refid1 = parsedUrl.searchParams.get('refid1');
    let rid = parsedUrl.searchParams.get('rid');
    let generatedUrl = '';

    if (domain.includes('ovationworldpanel.com') && pid1 && refid1 && rid) {
      // Se genera la nueva URL con los parámetros obtenidos
      generatedUrl = `https://notch.insights.supply/cb?token=${token}&pid1=${pid1}&refid1=${refid1}&rid=${rid}`;
    } else {
      throw new Error('URL no válida o parámetros faltantes');
    }

    return generatedUrl;
  } catch (e) {
    console.error(e); // Puedes agregar un mensaje de error para depurar
    return null;
  }
}
