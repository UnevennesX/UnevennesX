// Cambiar 'processUrls' a 'processUrl'
function processUrl(url) {
    try {
        if (url.includes('tsid=')) {
            // Si la URL contiene 'tsid', procesarla con la lógica de tsid
            const regex = /tsid=([a-f0-9]{32})/;
            const match = url.match(regex);
            if (match) {
                const tsid = match[1]; // El tsid extraído de la URL
                return `https://tssrvy.com/r/?st=1&tsid=${tsid}`; // Generar el nuevo enlace
            }
        } else if (url.includes('')) {
            // Si la URL pertenece a Survey, procesarla con los parámetros s2, rd_proj_ud, rdud
            let s2 = new URL(url).searchParams.get('s2');
            let rd_proj_ud = new URL(url).searchParams.get('rd_proj_ud');
            let rdud = new URL(url).searchParams.get('rdud');

            console.log('s2:', s2, 'rd_proj_ud:', rd_proj_ud, 'rdud:', rdud);

            // Verificar si 'rd_proj_ud' está presente
            if (!rd_proj_ud && !s2 && !rdud) {
                // Si falta todos los parámetros, no generamos la URL
                return null;
            }

            let generatedUrl = '';
            // Generar URL solo si hay parámetros disponibles
            if (s2 && rdud) {
                generatedUrl = `https://www.rdsecured.com/return?inbound_code=1000&rdud=${rdud}&rd_proj_ud=${rd_proj_ud}`;
            } else if (s2) {
                generatedUrl = `https://www.rdsecured.com/return?inbound_code=1000&rdud=${s2}&rd_proj_ud=${rd_proj_ud}`;
            } else if (rdud) {
                generatedUrl = `https://www.rdsecured.com/return?inbound_code=1000&rdud=${rdud}&rd_proj_ud=${rd_proj_ud}`;
            } else if (rd_proj_ud) {
                // Solo cuando rd_proj_ud está presente
                generatedUrl = `https://www.rdsecured.com/return?inbound_code=1000&rd_proj_ud=${rd_proj_ud}`;
            }

            return generatedUrl;
        }

        return null; // Si no se cumple ninguna de las condiciones, retornar null
    } catch (error) {
        // Manejo de error: se logea y se retorna null, pero no bloquea la ejecución de otros scripts
        console.error('Error al procesar la URL:', error);
        return null;
    }
}

















function processUrl(url) {
  try {
    // Obtener el dominio y los parámetros
    let domain = new URL(url).hostname;
    let arid = new URL(url).pathname.split('/')[2]; // Extraer el 'ca2e3c3b-8aec-42b4-8d25-a430509add93'
    let rid = new URL(url).searchParams.get('RID'); // Extraer el 'RID'

    let generatedUrl = '';

    // Verificar si el dominio es el esperado y los parámetros existen
    if (domain.includes('router.cint.com') && arid && rid) {
      // Generar la nueva URL con los parámetros obtenidos
      let token = '0749a007-a1d3-48c1-8ff3-12960c555867';
      generatedUrl = `https://notch.insights.supply/cb?token=${token}&RID=${rid}&cint_arid=${arid}`;
    } else {
      throw new Error('URL no válida');
    }

    return generatedUrl;
  } catch (e) {
    console.error(e);
    return null;
  }
}
