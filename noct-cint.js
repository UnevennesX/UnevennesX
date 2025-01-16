function processUrlNoctCint(url) {
    try {
      let domain = new URL(url).hostname;
       const token = '0749a007-a1d3-48c1-8ff3-12960c555867';
      let arid = new URL(url).pathname.split('/')[2];
      let rid = new URL(url).searchParams.get('RID');
      if (domain.includes('router.cint.com') && arid && rid && token) {
         return {url: `https://notch.insights.supply/cb?token=${token}&RID=${rid}&cint_arid=${arid}`, provider: 'Cint'};
      }
        return null;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
