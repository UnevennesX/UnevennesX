// --------------------
// Comienza la función 'processUrl'
// --------------------
function processUrl(url) {
  try {
    let generatedUrl = null; // Inicializamos la variable para almacenar la URL generada

    // Primer bloque: Procesar URL con 'tsid'
    if (url.includes('tsid=')) {
      const regex = /tsid=([a-f0-9]{32})/;
      const match = url.match(regex);
      if (match) {
        const tsid = match[1]; // Extraemos el 'tsid' de la URL
        generatedUrl = `https://tssrvy.com/r/?st=1&tsid=${tsid}`; // Generamos la nueva URL
      }
    } 
    // Segundo bloque: Procesar URL con parámetros de Survey
    else if (url.includes('')) {
      let s2 = new URL(url).searchParams.get('s2');
      let rd_proj_ud = new URL(url).searchParams.get('rd_proj_ud');
      let rdud = new URL(url).searchParams.get('rdud');
      
      // Verificar si los parámetros necesarios existen
      if (!rd_proj_ud && !s2 && !rdud) return 'URL no válida';

      // Generar la URL con los parámetros disponibles
      if (s2 && rdud) {
        generatedUrl = `https://www.rdsecured.com/return?inbound_code=1000&rdud=${rdud}&rd_proj_ud=${rd_proj_ud}`;
      } else if (s2) {
        generatedUrl = `https://www.rdsecured.com/return?inbound_code=1000&rdud=${s2}&rd_proj_ud=${rd_proj_ud}`;
      } else if (rdud) {
        generatedUrl = `https://www.rdsecured.com/return?inbound_code=1000&rdud=${rdud}&rd_proj_ud=${rd_proj_ud}`;
      } else if (rd_proj_ud) {
        generatedUrl = `https://www.rdsecured.com/return?inbound_code=1000&rd_proj_ud=${rd_proj_ud}`;
      }
    } 
    // Tercer bloque: Procesar URL con dominio 'router.cint.com'
    else {
      let domain = new URL(url).hostname;
      let arid = new URL(url).pathname.split('/')[2];
      let rid = new URL(url).searchParams.get('RID');

      // Verificar si la URL tiene el dominio esperado y los parámetros necesarios
      if (domain.includes('router.cint.com') && arid && rid) {
        let token = '0749a007-a1d3-48c1-8ff3-12960c555867';
        generatedUrl = `https://notch.insights.supply/cb?token=${token}&RID=${rid}&cint_arid=${arid}`;
      } 
      // Si la URL es de 'router.cint.com' pero le faltan parámetros, retornamos 'URL no válida'
      else if (domain.includes('router.cint.com')) {
        return 'URL no válida';
      }
    }

    // Si no se generó ninguna URL válida, retornamos 'URL no válida'
    if (!generatedUrl) {
      return 'URL no válida';
    }

    return generatedUrl; // Retornamos la URL generada

  } catch (error) {
    // Si ocurre un error, se captura y se devuelve 'URL no válida'
    console.error('Error al procesar la URL:', error);
    return 'URL no válida';
  }
}
// --------------------
// Termina la función 'processUrl'
// --------------------
