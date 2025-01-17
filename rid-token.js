// rid-token.js

function processUrl(url) {
  try {
    let domain = new URL(url).hostname;
    const token = '034287b2-1ca0-48d1-9e45-f5ca740ef529';

    if (domain.includes('lumen-research.com')) {
      let participant = new URL(url).searchParams.get('participant');
      if (participant) {  // Verificar que 'participant' exista antes de usarlo
        return `https://notch.insights.supply/cb?RID=${participant}&token=${token}`;
      }
      return 'URL no válida'; // Si no hay 'participant', retorna 'URL no válida'
    }

    return null; // Si no es un dominio de lumen-research
  } catch (e) {
    return null; // Si ocurre un error al parsear la URL
  }
}

export { processUrl };
