function processUrlInvite(url) {
    try {
        let domain = new URL(url).hostname;
      const token = 'M7FMAqNSgNBiTKRoDbiNJ4YiXPN2cBin';
      if (domain.includes('ipsosinteractive.com')) {
        let proj = new URL(url).searchParams.get('id');
         let param = new URL(url).searchParams.get('param1');
         if (proj && param && token){
           return { url: `https://redirect.mindsharesurveys.com/v1/${token}?proj=${param}&id=${proj}&status=1`, provider: 'Ipsos Interactive' };
          }
         }
        return null
    } catch (e) {
      console.error('Error en la URL:', e);
      return null;
    }
  }
