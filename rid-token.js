// rid-token.js

function processUrl(url) {
  try {
    let domain = new URL(url).hostname;
    let generatedUrl = '';

    if (domain.includes('lumen-research.com')) {
      let token = '034287b2-1ca0-48d1-9e45-f5ca740ef529';
      let participant = new URL(url).searchParams.get('participant'); // Busca 'participant'

      if (participant) { // Verifica que 'participant' no sea nulo o indefinido
        generatedUrl = `https://notch.insights.supply/cb?RID=${participant}&token=${token}`;
      } else {
         return 'URL no válida'; // Retorna 'URL no válida' si no hay participant
      }
    }
     return generatedUrl; // Retorna la URL generada si se pudo crear o "" si no se cumplio el if principal
  } catch (error) {
      console.error('Error al procesar la URL:', error);
    return null; // Retorna null si ocurre un error al parsear
  }
}

export { processUrl };
