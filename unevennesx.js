async function processUrlsFromTxt() {
    try {
        const response = await fetch("https://raw.githubusercontent.com/UnevennesX/UnevennesX/main/datos-info.txt");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        const blocks = text.trim().split("----------------");
        const templates = [];

        for (const block of blocks) {
             const lines = block.trim().split("\n");
            let name = null;
            let url = null;
            let provider = null;
            let template = null;
            let type = null;
            let token = null;
            let params = {};

            for (const line of lines) {
                const [key, value] = line.split(":").map(item => item.trim());

                if (key === "Nombre") {
                    name = value;
                } else if (key === "URL") {
                     url = value;
                       try {
                         const urlParams = new URLSearchParams(new URL(value).search);
                           for(const [paramKey, paramValue] of urlParams){
                             params[paramKey] = paramValue
                           }
                      } catch(e){}
                } else if (key === "Tipo de Survey") {
                    type = value;
                } else if (key === 'Template'){
                    template = value;
                }  else if (key === 'Token'){
                    token = value
                } else if (key.startsWith('Param_')){
                     const paramName = key.split('_')[1];
                      params[paramName] = value;
                 }
           }
            if (name && url && type === 'Samplicious') {
                templates.push({
                  name,
                  url,
                  provider,
                  template,
                  type,
                  token,
                    params
                });
            }
        }
        return templates;
    } catch (error) {
        console.error("Error al procesar el archivo TXT:", error);
        return [];
    }
}
async function processUrl(url){
    const templates = await processUrlsFromTxt();
     let result = null;
    if(templates.length > 0){
        const urlWithoutHttp = url.replace('http://www.', '').replace('https://www.', '').replace('https://', '').replace('http://', '')
        const urlWithoutCom = urlWithoutHttp.replace('.com', '').replace('.com/', '');
        const urlName = urlWithoutCom.split('/')[0];

          const matchingTemplates = templates.filter(
                    (template) => template.name === urlWithoutHttp || template.name === urlWithoutCom || template.name === urlName
               );

             if(matchingTemplates && matchingTemplates.length > 1){
               result = { multipleResults: true, templates: matchingTemplates, url};
             } else if (matchingTemplates && matchingTemplates.length === 1) {
               let matchingTemplate = matchingTemplates[0];
                 let finalUrl = matchingTemplate.url;
                    let rid = null;
                try{
                  const urlParams = new URLSearchParams(new URL(url).search);
                  rid = urlParams.get('RID');
                   } catch(e){}

                    if (matchingTemplate.url.includes('RID=') && rid && !matchingTemplate.url.includes('xxxx')) {
                           finalUrl = matchingTemplate.url.replace(/RID=[^&]*/, `RID=${rid}`);
                       }  else if (matchingTemplate.url.includes('RID=') && rid && matchingTemplate.url.includes('xxxx')) {
                          finalUrl = matchingTemplate.url.replace(/RID=xxxx[^&]*/, `RID=${rid}`);
                        } else if(matchingTemplate.url.includes('RID=') && rid === null){
                           finalUrl = matchingTemplate.url.concat('67')
                     }

                for (const paramKey in matchingTemplate.params) {
                 if(matchingTemplate.url.includes(`${paramKey}=`) && matchingTemplate.params[paramKey] && matchingTemplate.url.includes('xxxx')){
                          finalUrl = finalUrl.replace(`${paramKey}=xxxx[^&]*`, `${paramKey}=${matchingTemplate.params[paramKey]}`);
                       } else if (matchingTemplate.url.includes(`${paramKey}=`) && matchingTemplate.params[paramKey] && !matchingTemplate.url.includes(matchingTemplate.params[paramKey])) {
                          finalUrl = finalUrl.replace(`${paramKey}=[^&]*`, `${paramKey}=${matchingTemplate.params[paramKey]}`);
                      }
                 }
                 
                    let processed = null;
                     processed = processUrlNoctComun(finalUrl,matchingTemplate.token);
                       if(processed && processed.url){
                            result = processed;
                       } else if (matchingTemplate.template) {
                          result = {name: domain, url: `Sugerencia: ${matchingTemplate.template}`, provider: 'No se pudo procesar'};
                        }  else {
                            result =  {name: domain, url: 'URL no valida', provider: 'No se pudo procesar'};
                       }
              } else {
                   result = {name: domain, url: 'URL no valida', provider: 'No se pudo procesar'};
                }
          } else {
           result = {name: domain, url: 'URL no valida', provider: 'No se pudo procesar'};
          }
         return result;
}
 function processUrlNoctComun(url, token) {
    try {
      let rid = '';
       if (url.includes('qualtrics.com')) {
        rid = new URL(url).searchParams.get('rnid');
      } else if (url.includes('questionlab.com')) {
        rid = new URL(url).searchParams.get('RID');
      } else if (url.includes('surveys.audience-align.com')) {
        rid = new URL(url).searchParams.get('uid');
      } else if (url.includes('insights.surveynavigate.app')) {
          rid = new URL(url).searchParams.get('uid');
      }
         if(rid && token){
            return {url: `https://notch.insights.supply/cb?token=${token}&RID=${rid}`, provider: 'Samplicious' }
        } else {
            return null;
         }
    } catch (e) {
      console.error('Error procesando la URL: ', e);
      return null;
    }
  }
