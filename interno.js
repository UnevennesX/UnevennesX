function processUrl(url) {
    try {
        // Verificar si la URL contiene 'tsid'
        if (url.includes('tsid=')) {
            const regex = /tsid=([a-f0-9]{32})/;
            const match = url.match(regex);
            if (match) {
                const tsid = match[1]; // El tsid extraído de la URL
                return `https://tssrvy.com/r/?st=1&tsid=${tsid}`; // Generar el nuevo enlace
            }
        }

        // Verificar si la URL pertenece a 'se.navigatorsurveys.com'
        else if (url.includes('se.navigatorsurveys.com')) {
            let s2 = new URL(url).searchParams.get('s2');
            let rd_proj_ud = new URL(url).searchParams.get('rd_proj_ud');
            let rdud = new URL(url).searchParams.get('rdud');

            console.log('s2:', s2, 'rd_proj_ud:', rd_proj_ud, 'rdud:', rdud);

            if (!rd_proj_ud) {
                throw new Error('El parámetro "rd_proj_ud" es obligatorio.');
            }

            let generatedUrl = '';
            if (s2 && rdud) {
                generatedUrl = `https://www.rdsecured.com/return?inbound_code=1000&rdud=${rdud}&rd_proj_ud=${rd_proj_ud}`;
            } else if (s2) {
                generatedUrl = `https://www.rdsecured.com/return?inbound_code=1000&rdud=${s2}&rd_proj_ud=${rd_proj_ud}`;
            } else if (rdud) {
                generatedUrl = `https://www.rdsecured.com/return?inbound_code=1000&rdud=${rdud}&rd_proj_ud=${rd_proj_ud}`;
            } else {
                generatedUrl = `https://www.rdsecured.com/return?inbound_code=1000&rd_proj_ud=${rd_proj_ud}`;
            }

            return generatedUrl;
        }

        // Si la URL no corresponde a ninguno de los casos anteriores
        return null;

    } catch (error) {
        console.error('Error al procesar la URL:', error);
        return null;
    }
}

// Manejo del formulario y visualización de la URL generada
document.getElementById('urlForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const urlInput = document.getElementById('urlInput');
    const result = processUrl(urlInput.value);

    // Mostrar la URL generada o error según corresponda
    if (result) {
        document.getElementById('generatedTitle').classList.remove('hidden');
        document.getElementById('generatedUrl').classList.remove('hidden');
        document.getElementById('generatedUrl').innerText = result;
        document.getElementById('error').classList.add('hidden');
    } else {
        document.getElementById('generatedTitle').classList.add('hidden');
        document.getElementById('generatedUrl').classList.add('hidden');
        document.getElementById('error').classList.remove('hidden');
    }
});

// Copiar la URL generada al portapapeles
document.getElementById('generatedUrl').addEventListener('click', function() {
    var el = document.createElement('textarea');
    el.value = this.innerText;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    document.getElementById('notification').classList.remove('hidden');
});
