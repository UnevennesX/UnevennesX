 function processUrlInterno(url) {
    try {
      let generatedUrl = null;
      let provider = 'Interno';
      if (url.includes('tsid=')) {
        const regex = /tsid=([a-f0-9]{32})/;
        const match = url.match(regex);
        if (match) {
          const tsid = match[1];
          return { url: `https://tssrvy.com/r/?st=1&tsid=${tsid}`, provider: provider };
        }
      }
      else if (url.includes('')) {
        let s2 = new URL(url).searchParams.get('s2');
        let rd_proj_ud = new URL(url).searchParams.get('rd_proj_ud');
        let rdud = new URL(url).searchParams.get('rdud');

        if (!rd_proj_ud && !s2 && !rdud) return null;

        if (s2 && rdud) {
          return { url: `https://www.rdsecured.com/return?inbound_code=1000&rdud=${rdud}&rd_proj_ud=${rd_proj_ud}`, provider: provider };
        } else if (s2) {
         return { url: `https://www.rdsecured.com/return?inbound_code=1000&rdud=${s2}&rd_proj_ud=${rd_proj_ud}`, provider: provider };
        } else if (rdud) {
          return { url: `https://www.rdsecured.com/return?inbound_code=1000&rdud=${rdud}&rd_proj_ud=${rd_proj_ud}`, provider: provider };
        } else if (rd_proj_ud) {
          return { url: `https://www.rdsecured.com/return?inbound_code=1000&rd_proj_ud=${rd_proj_ud}`, provider: provider };
        }
      }
      else {
        let domain = new URL(url).hostname;
        let arid = new URL(url).pathname.split('/')[2];
        let rid = new URL(url).searchParams.get('RID');
         const token = '0749a007-a1d3-48c1-8ff3-12960c555867';

        if (domain.includes('router.cint.com') && arid && rid && token) {
         return {url: `https://notch.insights.supply/cb?token=${token}&RID=${rid}&cint_arid=${arid}`, provider: provider};
        }
        else if (domain.includes('router.cint.com')) {
          return null;
        }
      }
      if (!generatedUrl) {
        return null;
      }
       return {url: generatedUrl, provider: provider};
    } catch (error) {
      console.error('Error al procesar la URL:', error);
      return null;
    }
  }
