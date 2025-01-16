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
    
      return null;
    } catch (error) {
      console.error('Error al procesar la URL:', error);
      return null;
    }
  }
