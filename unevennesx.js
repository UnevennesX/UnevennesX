async function processUrlsFromTxt() {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/UnevennesX/UnevennesX/main/datos-info.txt"
    );
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
        const [key, value] = line.split(":").map((item) => item.trim());

        if (key === "Nombre") {
          name = value;
        } else if (key === "URL") {
          url = value;
           try {
               const urlParams = new URLSearchParams(new URL(value).search);
             for(const [paramKey, paramValue] of urlParams){
                 params[paramKey] = paramValue
               }
            }catch(e){
                
            }
        } else if (key === "Tipo de Survey") {
          type = value;
        } else if (key === "Template") {
          template = value;
          } else if (key === 'Token'){
                token = value
          } else if (key.startsWith('Param_')){
             const paramName = key.split('_')[1];
             params[paramName] = value;
          }
      }
      if (name && url && type) {
          const urlWithoutHttp = name.replace('http://www.', '').replace('https://www.', '').replace('https://', '').replace('http://', '')
          const urlWithoutCom = urlWithoutHttp.replace('.com', '').replace('.com/', '');
          const urlName = urlWithoutCom.split('/')[0];
        templates.push({
          name:urlName,
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
async function processUrl(url) {
    const templates = await processUrlsFromTxt();
     let result = null;
        if(templates.length > 0){
            const domain = new URL(url).hostname;
            const urlWithoutHttp = domain.replace('http://www.', '').replace('https://www.', '').replace('https://', '').replace('http://', '')
              const urlWithoutCom = urlWithoutHttp.replace('.com', '').replace('.com/', '');
            const urlName = urlWithoutCom.split('/')[0];

              const matchingTemplates = templates.filter(
                    (template) => urlWithoutHttp.includes(template.name) || urlWithoutCom.includes(template.name) || urlName === template.name
               );

            if(matchingTemplates && matchingTemplates.length > 1){
               result = { multipleResults: true, templates: matchingTemplates, url};
              } else if(matchingTemplates && matchingTemplates.length === 1){
                     let matchingTemplate = matchingTemplates[0];
                      let finalUrl = matchingTemplate.url;
                     let rid = null;

                  try{
                        const urlParams = new URLSearchParams(new URL(url).search);
                       rid = urlParams.get('RID');
                      } catch(e){}

                      if (matchingTemplate.url.includes('RID=') && rid && !matchingTemplate.url.includes('xxxx')) {
                           finalUrl = matchingTemplate.url.replace(/RID=[^&]*/, `RID=${rid}`);
                    } else if (matchingTemplate.url.includes('RID=') && rid && matchingTemplate.url.includes('xxxx')) {
                         finalUrl = matchingTemplate.url.replace(/RID=xxxx[^&]*/, `RID=${rid}`);
                      }  else if(matchingTemplate.url.includes('RID=') && rid === null){
                        
                           finalUrl = matchingTemplate.url.concat('67')
                     }
                 
                for (const paramKey in matchingTemplate.params) {
                 if(matchingTemplate.url.includes(`${paramKey}=`) && matchingTemplate.params[paramKey] && matchingTemplate.url.includes('xxxx')){
                           finalUrl = finalUrl.replace(`${paramKey}=xxxx[^&]*`, `${paramKey}=${matchingTemplate.params[paramKey]}`);

                       }
                     
                }
                     let processed = null;
                         if (matchingTemplate.type.includes('Sample-cube')) {
                            processed =  processUrlSampleCube(finalUrl);
                         } else if (matchingTemplate.type.includes('Samplicious')) {
                            processed = processUrlNoctComun(finalUrl);
                          } else if (matchingTemplate.type.includes('Lumen Research')) {
                             processed = processUrlRidToken(finalUrl);
                        } else if (matchingTemplate.type.includes('Cint')) {
                            processed = processUrlNoctCint(finalUrl);
                         } else if (matchingTemplate.type.includes('Ovation World Panel')) {
                             processed = processUrlNoctPocoComunes(finalUrl);
                          } else if (matchingTemplate.type.includes('Ipsos Interactive')) {
                             processed = processUrlInvite(finalUrl);
                           } else if (matchingTemplate.type.includes('Internos')) {
                                 processed = processUrlInterno(finalUrl);
                         }else if(matchingTemplate.type.includes('Spectrum'))
                         {
                                processed = {url: `http://www.el-corto.com`, provider: 'Spectrum'};
                        }else if(matchingTemplate.type.includes('Roirocket')){
                             processed = {url: `https://research.roirocket.com/surveyresults.aspx?ss=ad0434&vid=`, provider: 'Roirocket'}
                         } else if (matchingTemplate.type.includes('Progede')) {
                            processed = {url: `http://www.genera.com`, provider: 'Progede'}
                        }
                       else if(matchingTemplate.type.includes('Survey.Dashmr')){
                          processed = {url: `https://survey.dashmr.com/callback?status=Complete&spid=xxxxx&cx=BHV123`, provider: 'Survey.Dashmr'}
                         }
                            if(processed && processed.url){
                                result = processed;
                             }else if (matchingTemplate.template) {
                               result = {name: domain, url: `Sugerencia: ${matchingTemplate.template}`, provider: 'No se pudo procesar'};
                             } else {
                                  result = {name: domain, url: 'URL no valida', provider: 'No se pudo procesar'};
                             }
                    } else {
                         result = {name: domain, url: 'URL no valida', provider: 'No se pudo procesar'};
                         }
            } else {
             result = {name: domain, url: 'URL no valida', provider: 'No se pudo procesar'};
          }
           return result;
}

 function processUrlSampleCube(url) {
        try{
           let rid = new URL(url).searchParams.get('RID');
           return  { url: url, provider: 'Sample-Cube'} ;
          } catch(e){
              return null;
         }
       
}

function processUrlNoctComun(url) {
    try {
            return {url: url, provider: 'Samplicious' }
   } catch (e) {
      console.error('Error procesando la URL: ', e);
      return null;
    }
  }

function processUrlRidToken(url) {
    try {
         return { url: url, provider: 'Lumen Research' };
      } catch(e){
          return null;
     }
   }
  
  function processUrlNoctCint(url) {
    try {
        return {url: url, provider: 'Cint'};
  
    } catch (e) {
      console.error(e);
      return null;
    }
  }
  
 function processUrlInvite(url) {
    try {
         return { url: url, provider: 'Ipsos Interactive' };
    } catch (e) {
      console.error('Error en la URL:', e);
      return null;
    }
  }
  
 function processUrlNoctPocoComunes(url) {
    try {
        return { url: url, provider: 'Ovation World Panel' };
    } catch (e) {
      return null;
    }
  }
  
 function processUrlInterno(url) {
    try {
        return {url: url, provider: 'Interno'};
    } catch (error) {
      console.error('Error al procesar la URL:', error);
      return null;
    }
  }
