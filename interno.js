function processUrl(url) {
  try {
    // Si la URL contiene 'tsid', procesarla con la lógica de tsid
    if (url.includes('tsid=')) {
      const regex = /tsid=([a-f0-9]{32})/;
      const match = url.match(regex);
      if (match) {
        const tsid = match[1];
        return `https://tssrvy.com/r/?st=1&tsid=${tsid}`;
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
    } else {
      // Lógica para el procesamiento de URLs de Cint
      let domain = new URL(url).hostname;
      let arid = new URL(url).pathname.split('/')[2];
      let rid = new URL(url).searchParams.get('RID');

      let generatedUrl = '';
      if (domain.includes('router.cint.com') && arid && rid) {
        let token = '0749a007-a1d3-48c1-8ff3-12960c555867';
        generatedUrl = `https://notch.insights.supply/cb?token=${token}&RID=${rid}&cint_arid=${arid}`;
      } else {
        throw new Error('URL no válida');
      }

      return generatedUrl;
    }

    return null;
  } catch (error) {
    console.error('Error al procesar la URL:', error);
    return null;
  }
}
