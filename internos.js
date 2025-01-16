// Verificar si ya existe la función processUrl
if (typeof processUrl === 'undefined') {
  function processUrl(url) {
    try {
      // Crear un objeto URL para analizar la URL dada
      const parsedUrl = new URL(url);

      // Verificar si el dominio es el que nos interesa
      if (parsedUrl.hostname.includes('se.navigatorsurveys.com')) {
        // Obtener los parámetros 's2', 'rd_proj_ud' y 'rdud'
        const s2 = parsedUrl.searchParams.get('s2');
        const rd_proj_ud = parsedUrl.searchParams.get('rd_proj_ud');
        const rdud = parsedUrl.searchParams.get('rdud'); // Buscar el parámetro rdud

        // Verificar que rd_proj_ud siempre esté presente
        if (!rd_proj_ud) {
          // Si no se encuentra rd_proj_ud, retornar null porque es obligatorio
          return null;
        }

        // Si ambos parámetros están presentes, se usará rdud
        if (s2 && rdud) {
          return `https://www.rdsecured.com/return?inbound_code=1000&rdud=${rdud}&rd_proj_ud=${rd_proj_ud}`;
        }

        // Si solo s2 está presente, usarlo
        if (s2) {
          return `https://www.rdsecured.com/return?inbound_code=1000&rdud=${s2}&rd_proj_ud=${rd_proj_ud}`;
        }

        // Si solo rdud está presente, usarlo
        if (rdud) {
          return `https://www.rdsecured.com/return?inbound_code=1000&rdud=${rdud}&rd_proj_ud=${rd_proj_ud}`;
        }

        // Si no se encuentra ni s2 ni rdud, usar el valor de rd_proj_ud sin uno de los otros parámetros
        return `https://www.rdsecured.com/return?inbound_code=1000&rd_proj_ud=${rd_proj_ud}`;
      }

      // Si el dominio no es el correcto, retornar null
      return null;
    } catch (e) {
      // Manejo de errores: Si la URL es inválida, imprimir el error
      console.error('Error en la URL:', e.message);
      return null;
    }
  }
}

// Verificar si ya existe la función processDecipherUrl
if (typeof processDecipherUrl === 'undefined') {
  function processDecipherUrl(url) {
    try {
      // Extraer el dominio y el parámetro tsid de la URL
      let domain = new URL(url).hostname;
      let tsid = new URL(url).searchParams.get('tsid'); // Extraer el valor de tsid

      let generatedUrl = '';

      // Verificar si la URL es de decipherinc.com
      if (domain.includes('decipherinc.com') && tsid) {
        // Generar la nueva URL con el parámetro tsid
        generatedUrl = `https://tssrvy.com/r/?st=1&tsid=${tsid}`;
      } else {
        throw new Error('URL no válida');
      }

      return generatedUrl;
    } catch (e) {
      return null;
    }
  }
}

// Manejo del formulario y visualización de la URL generada
document.getElementById('urlForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const urlInput = document.getElementById('urlInput');
  const result = processDecipherUrl(urlInput.value);  // Usamos la nueva función

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
