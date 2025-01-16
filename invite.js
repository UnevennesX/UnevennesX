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
function processUrlInvite(url) {
    try {
        let domain = new URL(url).hostname;
      const token = 'M7FMAqNSgNBiTKRoDbiNJ4YiXPN2cBin';
      if (domain.includes('ipsosinteractive.com')) {
        let proj = new URL(url).searchParams.get('id');
         let param = new URL(url).searchParams.get('param1');
         if (proj && param && token){
           return { url: `https://redirect.mindsharesurveys.com/v1/${token}?proj=${param}&id=${proj}&status=1`, provider: 'Ipsos Interactive' };
          }
         }
        return null
    } catch (e) {
      console.error('Error en la URL:', e);
      return null;
    }
    return generatedUrl;
  } catch (e) {
    console.error('Error en la URL:', e);
    return null;
  }
}
