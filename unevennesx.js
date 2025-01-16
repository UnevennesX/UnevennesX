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

            for (const line of lines) {
                const [key, value] = line.split(":").map(item => item.trim());

                if (key === "Nombre") {
                    name = value;
                } else if (key === "URL") {
                    url = value;
                } else if (key === "Tipo de Survey"){
                     provider = value;
                }
            }
            
             if (name && url) {
               const processed = dispatchUrl(url);
                if(processed && processed.url){
                  results.push({ name, url: processed.url, provider: processed.provider});
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
