export function processQualtrics(url) {
  const token = '5a9c985a-f633-46a5-925c-6ca593f1a8b0';
  const rid = new URL(url).searchParams.get('rnid');
  return `https://notch.insights.supply/cb?token=${token}&RID=${rid}`;
}

export function processQuestionLab(url) {
  const token = '9575fc16-0317-4608-93e9-b477730e37ac';
  const rid = new URL(url).searchParams.get('RID');
  return `https://notch.insights.supply/cb?token=${token}&RID=${rid}`;
}

export function processLumen(url) {
  const token = '034287b2-1ca0-48d1-9e45-f5ca740ef529';
  const rid = new URL(url).searchParams.get('RID');
  return `https://notch.insights.supply/cb?RID=${rid}&token=${token}`;
}

export function processAudienceAlign(url) {
  const token = 'cb8f4af5-0173-44b1-802a-8c7d5cabd9e3';
  const rid = new URL(url).searchParams.get('uid');
  if (rid) {
    return `https://notch.insights.supply/cb?token=${token}&RID=${rid}`;
  } else {
    console.error('No se pudo extraer el UID de la URL proporcionada.');
    return null;
  }
}

export function processSurveyNavigate(url) {
  const token = '07acc3b2-400d-4219-8c33-67eb3257720f';
  const rid = new URL(url).searchParams.get('uid');
  if (rid) {
    return `https://notch.insights.supply/cb?token=${token}&RID=${rid}`;
  } else {
    console.error('No se pudo extraer el UID de la URL proporcionada.');
    return null;
  }
}
