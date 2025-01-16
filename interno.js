// --------------------
// Comienza la primera función (procesar URL con 'tsid' y Survey)
// --------------------
function processUrlTsid(url) {
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
      
      if (!rd_proj_ud && !s2 && !rdud) return null;
      
      let generatedUrl = '';
      if (s2 && rdud) {
        generatedUrl = `https://www.rdsecured.com/return?inbound_code=1000&rdud=${rdud}&rd_proj_ud=${rd_proj_ud}`;
      } else if (s2) {
        generatedUrl = `https://www.rdsecured.com/return?inbound_code=1000&rdud=${s2}&rd_proj_ud=${rd_proj_ud}`;
      } else if (rdud) {
        generatedUrl = `https://www.rdsecured.com/return?inbound_code=1000&rdud=${rdud}&rd_proj_ud=${rd_proj_ud}`;
      } else if (rd_proj_ud) {
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
// --------------------
// Termina la primera función
// --------------------

// --------------------
// Comienza la función para procesar la URL con dominio 'router.cint.com'
// --------------------
function processUrlCint(url) {
  try {
    // Obtener el dominio y los parámetros de la URL
    let domain = new URL(url).hostname; // Obtener el dominio
    let arid = new URL(url).pathname.split('/')[2]; // Obtener el 'arid' (parte de la ruta)
    let rid = new URL(url).searchParams.get('RID'); // Obtener el 'RID' de los parámetros

    let generatedUrl = '';

    // Verificar si el dominio es 'router.cint.com' y si 'arid' y 'RID' están presentes
    if (domain.includes('router.cint.com') && arid && rid) {
      let token = '0749a007-a1d3-48c1-8ff3-12960c555867'; // Token fijo para la URL generada
      generatedUrl = `https://notch.insights.supply/cb?token=${token}&RID=${rid}&cint_arid=${arid}`;
    } else {
      // Si el dominio o los parámetros no están presentes, generar un error
      throw new Error('URL no válida o parámetros faltantes');
    }

    return generatedUrl; // Retornar la URL generada
  } catch (e) {
    // Manejo de error
    console.error('Error al procesar la URL:', e.message);
    return null; // Retornar null si hay un error
  }
}
// --------------------
// Termina la función para procesar la URL con dominio 'router.cint.com'
// --------------------
