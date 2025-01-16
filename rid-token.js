 function processUrlRidToken(url) {
    try{
        let domain = new URL(url).hostname;
       const token = '034287b2-1ca0-48d1-9e45-f5ca740ef529';
      if (domain.includes('lumen-research.com')) {
         let rid = new URL(url).searchParams.get('RID');
         if(rid && token){
            return { url: `https://notch.insights.supply/cb?RID=${rid}&token=${token}`, provider: 'Lumen Research' };
          }
        }
     return null;
     } catch(e){
          return null
    }
  }
