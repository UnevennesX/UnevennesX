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
