function processUrlNoctPocoComunes(url) {
    try {
      let domain = new URL(url).hostname;
      const token = '04651664-4715-4620-8f59-16a272ff3e4a';
        let pid1 = new URL(url).searchParams.get('pid1');
        let refid1 = new URL(url).searchParams.get('refid1');
        let rid = new URL(url).searchParams.get('rid');
       if (domain.includes('ovationworldpanel.com') && pid1 && refid1 && rid && token) {
        return { url: `https://notch.insights.supply/cb?token=${token}&pid1=${pid1}&refid1=${refid1}&rid=${rid}`, provider: 'Ovation World Panel' };
       }
         return null;
    } catch (e) {
      return null;
    }
  }
