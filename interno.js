// --------------------
// Comienza la función única processUrl
// --------------------
function processUrl(url) {
  try {
    let generatedUrl = null; // Variable para almacenar la URL generada

    // Procesar URL con 'tsid'
    if (url.includes('tsid=')) {
      const regex = /tsid=([a-f0-9]{32})/;
      const match = url.match(regex);
      if (match) {
        const tsid = match[1]; // El tsid extraído de la URL
        generatedUrl = `https://tssrvy.com/r/?st=1&tsid=${tsid}`; // Generar el nuevo enlace
      }
    } 
    // Procesar URL con parámetros de Survey
    else if (url.includes('')) {
      let s2 = new URL(url).searchParams.get('s2');
      let rd_proj_ud = new URL(url).searchParams.get('rd_proj_ud');
      let rdud = new URL(url).searchParams.get('rdud');
      
      if (!rd_proj_ud && !s2 && !rdud) return null;
      
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
    // Procesar URL con dominio 'router.cint.com'
    else if (url.includes('router.cint.com')) {
      let domain = new URL(url).hostname;
      let arid = new URL(url).pathname.split('/')[2];
      let rid = new URL(url).searchParams.get('RID');
  
      if (domain.includes('router.cint.com') && arid && rid) {
        let token = '0749a007-a1d3-48c1-8ff3-12960c555867';
        generatedUrl = `https://notch.insights.supply/cb?token=${token}&RID=${rid}&cint_arid=${arid}`;
      }
    }
    
    // Nueva condición o lógica adicional que desees agregar
    // -------------------- 
    else if (url.includes('nueva-condicion')) {
      // Agregar nueva lógica de procesamiento de URL aquí
      generatedUrl = `https://nueva-url.com?parametro=valor`;
    }
    // -------------------- 
    
    // Si no se generó ninguna URL válida
    if (!generatedUrl) {
      return null;
    }

    return generatedUrl;  // Retornar la URL generada
  } catch (error) {
    // Manejo de error: se logea el error, pero no interrumpe la ejecución del resto de los scripts
    console.error('Error al procesar la URL:', error);
    return null;
  }
}
// --------------------
// Termina la función única processUrl
// --------------------
