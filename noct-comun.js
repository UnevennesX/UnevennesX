function processUrl(url) {
  try {
    let domain = new URL(url).hostname;
    let token = '';
    let rid = '';
    let generatedUrl = '';
    if (domain.includes('qualtrics.com')) {
      token = '5a9c985a-f633-46a5-925c-6ca593f1a8b0'; // Token de Qualtrics
      rid = new URL(url).searchParams.get('rnid');
      generatedUrl = `https://notch.insights.supply/cb?token=${token}&RID=${rid}`;
    } else if (domain.includes('questionlab.com')) {
      token = '9575fc16-0317-4608-93e9-b477730e37ac'; // Token de Questionlab
      rid = new URL(url).searchParams.get('RID');
      generatedUrl = `https://notch.insights.supply/cb?token=${token}&RID=${rid}`;
    } else if (domain.includes('surveys.audience-align.com')) {
      token = 'cb8f4af5-0173-44b1-802a-8c7d5cabd9e3'; // Token específico de Audience Align
      rid = new URL(url).searchParams.get('uid'); // Extraer el UID de la URL
      if (rid) {
        generatedUrl = `https://notch.insights.supply/cb?token=${token}&RID=${rid}`;
      } else {
        console.error('No se pudo extraer el UID de la URL proporcionada.');
        return null;
      }
    } else if (domain.includes('insights.surveynavigate.app')) {
      token = '07acc3b2-400d-4219-8c33-67eb3257720f'; // Token específico de Audience Align
      rid = new URL(url).searchParams.get('uid'); // Extraer el UID de la URL
      if (rid) {
        generatedUrl = `https://notch.insights.supply/cb?token=${token}&RID=${rid}`;
      } else {
        console.error('No se pudo extraer el UID de la URL proporcionada.');
        return null;
      }
    }
    // Devuelve la URL generada si se ha creado correctamente
    return generatedUrl;
  } catch (e) {
    console.error('Error procesando la URL: ', e);
    return null;
  }
}
