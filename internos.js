
  function processUrl(url) {
  try {
    let domain = new URL(url).hostname; // Asegúrate de declarar la variable 'domain'
    let generatedUrl = '';

    if (domain.includes('se.navigatorsurveys.com')) {
      let proj = new URL(url).searchParams.get('rd_proj_ud');
      let param = new URL(url).searchParams.get('s2');
      generatedUrl = `https://www.rdsecured.com/return?inbound_code=1000&rdud=${s2}&rd_proj_ud=${rd_proj_ud}`;
    } else {
      return null; // Para los demás dominios, puedes manejar otro caso
    }
    return generatedUrl;
  } catch (e) {
    console.error('Error en la URL:', e);
    return null;
  }
}
