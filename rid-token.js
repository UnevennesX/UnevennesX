function processUrl(url) {
  let domain = new URL(url).hostname;
  let generatedUrl = '';
  if (domain.includes('lumen-research.com')) {
    let token = '034287b2-1ca0-48d1-9e45-f5ca740ef529'; // Token de Lumen
    let rid = new URL(url).searchParams.get('RID'); // Obtener el parámetro 'RID'
    generatedUrl = `https://notch.insights.supply/cb?RID=${rid}&token=${token}`; // URL generada
  }
  return generatedUrl;
}
