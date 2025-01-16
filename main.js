// main.js
function dispatchUrl(url) {
    if (url.includes('surveys.sago.com')) {
        const result = processUrlSampleCube(url);
        return result ? { url: result, provider: 'Sample-Cube' } : null;
    } else if (url.includes('qualtrics.com') || url.includes('questionlab.com') || url.includes('surveys.audience-align.com') || url.includes('insights.surveynavigate.app')) {
       const result = processUrlNoctComun(url);
        return result ? { url: result, provider: 'Samplicious' } : null;
    } else if (url.includes('lumen-research.com')) {
        const result = processUrlRidToken(url);
        return result ? { url: result, provider: 'Lumen Research' } : null;
    } else if (url.includes('router.cint.com')) {
      const result = processUrlNoctCint(url);
        return result ? { url: result, provider: 'Cint' } : null;
    } else if (url.includes('ovationworldpanel.com')) {
      const result = processUrlNoctPocoComunes(url);
        return result ? { url: result, provider: 'Ovation World Panel' } : null;
    } else if (url.includes('ipsosinteractive.com')) {
      const result = processUrlInvite(url);
        return result ? { url: result, provider: 'Ipsos Interactive' } : null;
    } else if (url.includes('tsid=') || url.includes('rd_proj_ud=') || url.includes('s2=') || url.includes('rdud=')) {
        const result = processUrlInterno(url);
        return result === 'URL no válida' ? null : {url: result, provider:'Interno'};
    }

    return null;
}

// Función para procesar la URL
function processUrlSampleCube(url) {
    let domain = new URL(url).hostname;
    let generatedUrl = '';
    const token = '1574'; // Token para Sample-Cube
    // Verificar si el dominio es 'surveys.sago.com'
    if (domain === 'surveys.sago.com') {
        let rid = new URL(url).searchParams.get('RID');
         if (rid && token) {
            generatedUrl = `https://surveys.sample-cube.com/ending?RS=1&RID=${rid}&secret=${token}`;
          }
    }
    
    return generatedUrl;
}

function processUrlNoctComun(url) {
    try {
      let domain = new URL(url).hostname;
      let token = '';
      let rid = '';
      let generatedUrl = '';
  
      if (domain.includes('qualtrics.com')) {
        token = '5a9c985a-f633-46a5-925c-6ca593f1a8b0';
        rid = new URL(url).searchParams.get('rnid');
        if (rid && token) {
          generatedUrl = `https://notch.insights.supply/cb?token=${token}&RID=${rid}`;
        }
        
      } else if (domain.includes('questionlab.com')) {
        token = '9575fc16-0317-4608-93e9-b477730e37ac';
        rid = new URL(url).searchParams.get('RID');
        if(rid && token){
          generatedUrl = `https://notch.insights.supply/cb?token=${token}&RID=${rid}`;
        }
      } else if (domain.includes('surveys.audience-align.com')) {
        token = 'cb8f4af5-0173-44b1-802a-8c7d5cabd9e3';
        rid = new URL(url).searchParams.get('uid');
          if (rid && token) {
            generatedUrl = `https://notch.insights.supply/cb?token=${token}&RID=${rid}`;
          } else {
            console.error('No se pudo extraer el UID de la URL proporcionada.');
            return null;
          }
      } else if (domain.includes('insights.surveynavigate.app')) {
        token = '07acc3b2-400d-4219-8c33-67eb3257720f';
        rid = new URL(url).searchParams.get('uid');
        if(rid && token) {
          generatedUrl = `https://notch.insights.supply/cb?token=${token}&RID=${rid}`;
        }else {
          console.error('No se pudo extraer el UID de la URL proporcionada.');
          return null;
        }
      }
  
      return generatedUrl;
  
    } catch (e) {
      console.error('Error procesando la URL: ', e);
      return null;
    }
  }

  function processUrlRidToken(url) {
    let domain = new URL(url).hostname;
    let generatedUrl = '';
    const token = '034287b2-1ca0-48d1-9e45-f5ca740ef529';
    if (domain.includes('lumen-research.com')) {
      let rid = new URL(url).searchParams.get('RID');
      if(rid && token){
        generatedUrl = `https://notch.insights.supply/cb?RID=${rid}&token=${token}`;
      }
    }
  
    return generatedUrl;
  }

  function processUrlNoctCint(url) {
    try {
      let domain = new URL(url).hostname;
      let arid = new URL(url).pathname.split('/')[2];
      let rid = new URL(url).searchParams.get('RID');
       const token = '0749a007-a1d3-48c1-8ff3-12960c555867';

      if (domain.includes('router.cint.com') && arid && rid && token) {
        generatedUrl = `https://notch.insights.supply/cb?token=${token}&RID=${rid}&cint_arid=${arid}`;
      } else {
        throw new Error('URL no válida');
      }
  
      return generatedUrl;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  function processUrlInvite(url) {
    try {
      let domain = new URL(url).hostname;
      let generatedUrl = '';
      const token = 'M7FMAqNSgNBiTKRoDbiNJ4YiXPN2cBin';
      if (domain.includes('ipsosinteractive.com')) {
        let proj = new URL(url).searchParams.get('id');
        let param = new URL(url).searchParams.get('param1');
        if (proj && param && token){
          generatedUrl = `https://redirect.mindsharesurveys.com/v1/${token}?proj=${param}&id=${proj}&status=1`;
        }
      } else {
        return null;
      }
      return generatedUrl;
    } catch (e) {
      console.error('Error en la URL:', e);
      return null;
    }
  }

  function processUrlNoctPocoComunes(url) {
    try {
      let domain = new URL(url).hostname;
      let token = '04651664-4715-4620-8f59-16a272ff3e4a';
      let pid1 = new URL(url).searchParams.get('pid1');
      let refid1 = new URL(url).searchParams.get('refid1');
      let rid = new URL(url).searchParams.get('rid');
      let generatedUrl = '';

      if (domain.includes('ovationworldpanel.com') && pid1 && refid1 && rid && token) {
        generatedUrl = `https://notch.insights.supply/cb?token=${token}&pid1=${pid1}&refid1=${refid1}&rid=${rid}`;
      } else {
        throw new Error('URL no válida');
      }

      return generatedUrl;
    } catch (e) {
      return null;
    }
  }
  function processUrlInterno(url) {
    try {
      let generatedUrl = null;
      if (url.includes('tsid=')) {
        const regex = /tsid=([a-f0-9]{32})/;
        const match = url.match(regex);
        if (match) {
          const tsid = match[1];
          generatedUrl = `https://tssrvy.com/r/?st=1&tsid=${tsid}`;
        }
      }
      else if (url.includes('')) {
        let s2 = new URL(url).searchParams.get('s2');
        let rd_proj_ud = new URL(url).searchParams.get('rd_proj_ud');
        let rdud = new URL(url).searchParams.get('rdud');

        if (!rd_proj_ud && !s2 && !rdud) return 'URL no válida';

        if (s2 && rdud) {
          generatedUrl = `https://www.rdsecured.com/return?inbound_code=1000&rdud=${rdud}&rd_proj_ud=${rd_proj_ud}`;
        } else if (s2) {
          generatedUrl = `https://www.rdsecured.com/return?inbound_code=1000&rdud=${s2}&rd_proj_ud=${rd_proj_ud}`;
        } else if (rdud) {
          generatedUrl = `https://www.rdsecured.com/return?inbound_code=1000&rdud=${rdud}&rd_proj_ud=${rd_proj_ud}`;
        } else if (rd_proj_ud) {
          generatedUrl = `https://www.rdsecured.com/return?inbound_code=1000&rd_proj_ud=${rd_proj_ud}`;
        }
      }
      else {
        let domain = new URL(url).hostname;
        let arid = new URL(url).pathname.split('/')[2];
        let rid = new URL(url).searchParams.get('RID');
         const token = '0749a007-a1d3-48c1-8ff3-12960c555867';

        if (domain.includes('router.cint.com') && arid && rid && token) {
          generatedUrl = `https://notch.insights.supply/cb?token=${token}&RID=${rid}&cint_arid=${arid}`;
        }
        else if (domain.includes('router.cint.com')) {
          return 'URL no válida';
        }
      }
      if (!generatedUrl) {
        return 'URL no válida';
      }
      return generatedUrl;
    } catch (error) {
      console.error('Error al procesar la URL:', error);
      return 'URL no válida';
    }
  }

document.getElementById('urlForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const urlInput = document.getElementById('urlInput');
    const result = dispatchUrl(urlInput.value);

    if (result && result.url) {
      document.getElementById('generatedTitle').classList.remove('hidden');
      document.getElementById('generatedUrl').classList.remove('hidden');
      document.getElementById('generatedUrl').innerHTML = `<span class="survey-name">${result.provider}</span><br><p id="notchLink">${result.url}</p>`;
      
      document.getElementById('error').classList.add('hidden');

       copyToClipboard(result.url);


       document.getElementById('notchLink').addEventListener('click', function() {
         copyToClipboard(this.innerText);
         this.classList.add('copied');
         setTimeout(() => {
          this.classList.remove('copied');
        }, 1000)
       });
    } else {
      document.getElementById('generatedTitle').classList.add('hidden');
      document.getElementById('generatedUrl').classList.add('hidden');
      document.getElementById('error').classList.remove('hidden');
      document.getElementById('generatedUrl').innerHTML = 'URL no reconocida o no válida';
    }
});

document.getElementById('generatedUrl').addEventListener('click', function() {
    var el = document.createElement('textarea');
    el.value = this.innerText;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    document.getElementById('notification').classList.remove('hidden');
});
function copyToClipboard(url) {
  navigator.clipboard.writeText(url).then(() => {
    let notification = document.getElementById('notification');
    notification.classList.remove('hidden');
    notification.style.display = 'block'; // Mostrar mensaje inmediatamente
    setTimeout(() => {
      notification.style.display = 'none'; // Ocultar mensaje después de 20 segundos
    }, 20000);
  }).catch(() => {
    alert('Error al copiar al portapapeles');
  });
}
