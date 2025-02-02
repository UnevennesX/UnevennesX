// Función para procesar la URL según el dominio
function processUrl(url) {
    let domain = new URL(url).hostname;
    let generatedUrl = '';

    // Verificar si el dominio es 'surveys.sago.com'
    if (domain === 'surveys.sago.com') {
        let rid = new URL(url).searchParams.get('RID');
        generatedUrl = `https://surveys.sample-cube.com/ending?RS=1&RID=${rid}&secret=3112`;
    }
    
    return generatedUrl;
}
