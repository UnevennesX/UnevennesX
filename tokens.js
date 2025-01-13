export function processUrl(url) {
  try {
    const domain = new URL(url).hostname;
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
    } else if (domain.includes('lumen-research.com')) {
      token = '034287b2-1ca0-48d1-9e45-f5ca740ef529'; // Token de Lumen
      rid = new URL(url).searchParams.get('RID');
      generatedUrl = `https://notch.insights.supply/cb?RID=${rid}&token=${token}`;
    } else if (domain.includes('ipsosinteractive.com')) {
      const proj = new URL(url).searchParams.get('id');
      const param = new URL(url).searchParams.get('param1');
      generatedUrl = `https://redirect.mindsharesurveys.com/v1/M7FMAqNSgNBiTKRoDbiNJ4YiXPN2cBin?proj=${param}&id=${proj}&status=1`;
    } else if (domain === 'surveys.sago.com') {
      rid = new URL(url).searchParams.get('RID');
      generatedUrl = `https://surveys.sample-cube.com/ending?RS=1&RID=${rid}&secret=1574`;
    } else if (domain.includes('surveys.audience-align.com')) {
      token = 'cb8f4af5-0173-44b1-802a-8c7d5cabd9e3'; // Token de Audience Align
      rid = new URL(url).searchParams.get('uid');
      if (rid) {
        generatedUrl = `https://notch.insights.supply/cb?token=${token}&RID=${rid}`;
      } else {
        console.error('No se pudo extraer el UID de la URL proporcionada.');
        return null;
      }
    } else if (domain.includes('insights.surveynavigate.app')) {
      token = '07acc3b2-400d-4219-8c33-67eb3257720f'; // Token específico
      rid = new URL(url).searchParams.get('uid');
      if (rid) {
        generatedUrl = `https://notch.insights.supply/cb?token=${token}&RID=${rid}`;
      } else {
        console.error('No se pudo extraer el UID de la URL proporcionada.');
        return null;
      }
    } else {
      return null;
    }
    return generatedUrl;
  } catch (e) {
    console.error('Error procesando la URL:', e);
    return null;
  }
}
