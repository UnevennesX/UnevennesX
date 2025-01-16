function processUrlNoctComun(url) {
    try {
      let domain = new URL(url).hostname;
      let token = '';
      let rid = '';
      
        if (domain.includes('qualtrics.com')) {
          token = '5a9c985a-f633-46a5-925c-6ca593f1a8b0';
          rid = new URL(url).searchParams.get('rnid');
        } else if (domain.includes('questionlab.com')) {
          token = '9575fc16-0317-4608-93e9-b477730e37ac';
          rid = new URL(url).searchParams.get('RID');
         } else if (domain.includes('surveys.audience-align.com')) {
          token = 'cb8f4af5-0173-44b1-802a-8c7d5cabd9e3';
           rid = new URL(url).searchParams.get('uid');
         } else if (domain.includes('insights.surveynavigate.app')) {
             token = '07acc3b2-400d-4219-8c33-67eb3257720f';
           rid = new URL(url).searchParams.get('uid');
         }
         if(rid && token){
           return {url: `https://notch.insights.supply/cb?token=${token}&RID=${rid}`, provider: 'Samplicious'}
        }
      return null;
  
    } catch (e) {
      console.error('Error procesando la URL: ', e);
      return null;
    }
  }
