// unevennesx.js
async function processUrlsFromTxt() {
    try {
        const response = await fetch("https://raw.githubusercontent.com/UnevennesX/UnevennesX/main/datos-info.txt");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        const blocks = text.trim().split("----------------");
        const results = [];

        for (const block of blocks) {
            const lines = block.trim().split("\n");
            let name = null;
            let url = null;
            let provider = null;
             let template = null;
            let rid = null;


            for (const line of lines) {
                const [key, value] = line.split(":").map(item => item.trim());

                if (key === "Nombre") {
                    name = value;
                } else if (key === "URL") {
                    url = value;
                   
                     try {
                      const urlParams = new URLSearchParams(new URL(value).search);
                         rid = urlParams.get('RID');
                      } catch(error){
                          rid = null
                      }
                   
                } else if (key === "Tipo de Survey"){
                     provider = value;
                } else if (key === 'Template'){
                    template = value;
                  }
            }
            
            if (name && url) {
                 let finalUrl = url;
                   if (rid === null || rid === undefined || rid === ''){
                    finalUrl = url
                   } else if(rid.startsWith('67')) {
                   finalUrl = url;
                   }else if (template){
                        const urlWithoutRid = url.split('&RID=')[0];
                        finalUrl = `${urlWithoutRid}&RID=67`;

                   }
                   
                     const processed = dispatchUrl(finalUrl);
                     if(processed && processed.url){
                        results.push({ name, url: processed.url, provider: processed.provider});
                      } else if (template) {
                         results.push({ name, url: `Sugerencia: ${template}`, provider: 'No se pudo procesar'});
                      } else {
                           results.push({name, url: 'URL no valida', provider: 'No se pudo procesar'});
                      }
            }
        }
        return results;
    } catch (error) {
        console.error("Error al procesar el archivo TXT:", error);
        return [];
    }
}
