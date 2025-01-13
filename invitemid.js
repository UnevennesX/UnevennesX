  function processUrl(url) {
  try {
    let domain = new URL(url).hostname; // Asegúrate de declarar la variable 'domain'
    let generatedUrl = '';

    if (domain.includes('ipsosinteractive.com')) {
      let proj = new URL(url).searchParams.get('id');
      let param = new URL(url).searchParams.get('param1');
      generatedUrl = `https://redirect.mindsharesurveys.com/v1/M7FMAqNSgNBiTKRoDbiNJ4YiXPN2cBin?proj=${param}&id=${proj}&status=1`;
    } else {
      return null; // Para los demás dominios, puedes manejar otro caso
    }
    return generatedUrl;
  } catch (e) {
    console.error('Error en la URL:', e);
    return null;
  }
}
