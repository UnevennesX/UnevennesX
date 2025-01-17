// main.js

// Importar las funciones processUrl de cada archivo (asegúrate que la ruta sea correcta)
import { processUrl as processUrlInterno } from './interno.js';
import { processUrl as processUrlNoctComun } from './noct-comun.js';
import { processUrl as processUrlSampleCube } from './sample-cube.js';
import { processUrl as processUrlRidToken } from './rid-token.js';
import { processUrl as processUrlNoctPocoComunes } from './noct-poco-comunes.js';
import { processUrl as processUrlNoctCint } from './noct-cint.js';
import { processUrl as processUrlInvite } from './invite.js';

// Función principal para distribuir la URL al procesador correcto
function dispatchUrl(url) {
  // Definir el orden de prioridad o lógica
  if (url.includes('surveys.sago.com')) {
    return processUrlSampleCube(url); // sample-cube.js
  } else if (
    url.includes('qualtrics.com') ||
    url.includes('questionlab.com') ||
    url.includes('surveys.audience-align.com') ||
    url.includes('insights.surveynavigate.app')
  ) {
    return processUrlNoctComun(url); // noct-comun.js
  }  else if (url.includes('lumen-research.com')) {
    return processUrlRidToken(url); // rid-token.js
  } else if (url.includes('router.cint.com')) {
    return processUrlNoctCint(url); // noct-cint.js
  } else if (url.includes('ovationworldpanel.com')) {
    return processUrlNoctPocoComunes(url); // noct-poco-comunes.js
  } else if (url.includes('ipsosinteractive.com')) {
    return processUrlInvite(url); //invite.js
    }else if (url.includes('tsid=') || url.includes('rd_proj_ud=') || url.includes('s2=') || url.includes('rdud=')) {
        return processUrlInterno(url) //interno.js
      }
    
    
  return null; // Si no coincide con ninguna función, devuelve null
}


// Función para procesar la URL según el dominio sample-cube
function processUrlSampleCube(url) {
    let domain = new URL(url).hostname;
    let generatedUrl = '';
    // Verificar si el dominio es 'surveys.sago.com'
    if (domain === 'surveys.sago.com') {
        let rid = new URL(url).searchParams.get('RID');
        generatedUrl = `https://surveys.sample-cube.com/ending?RS=1&RID=${rid}&secret=1574`;
    }
    
    return generatedUrl;
}

// Función para procesar la URL según el dominio noct-comun
function processUrlNoctComun(url) {
  try {
    let domain = new URL(url).hostname;
    let token = '';
    let rid = '';
    let generatedUrl = '';

    if (domain.includes('qualtrics.com')) {
      token = '5a9c985a-f633-46a5-925c-6ca593f1a8b0'; // Token de Qualtrics
      rid = new URL(url).searchParams.get('rnid');
      generatedUrl = `https://notch.insights.supply/cb?token=${token}&RID=${rid}`;
    } else if (domain.includes('questionlab.com')) {
      token = '9575fc16-0317-4608-93e9-b477730e37ac'; // Token de Questionlab
      rid = new URL(url).searchParams.get('RID');
      generatedUrl = `https://notch.insights.supply/cb?token=${token}&RID=${rid}`;
    } else if (domain.includes('surveys.audience-align.com')) {
      token = 'cb8f4af5-0173-44b1-802a-8c7d5cabd9e3'; // Token específico de Audience Align
      rid = new URL(url).searchParams.get('uid'); // Extraer el UID de la URL
      if (rid) {
        generatedUrl = `https://notch.insights.supply/cb?token=${token}&RID=${rid}`;
      } else {
        console.error('No se pudo extraer el UID de la URL proporcionada.');
        return null;
      }
    } else if (domain.includes('insights.surveynavigate.app')) {
      token = '07acc3b2-400d-4219-8c33-67eb3257720f'; // Token específico de Audience Align
      rid = new URL(url).searchParams.get('uid'); // Extraer el UID de la URL
      if (rid) {
        generatedUrl = `https://notch.insights.supply/cb?token=${token}&RID=${rid}`;
      } else {
        console.error('No se pudo extraer el UID de la URL proporcionada.');
        return null;
      }
    }

    // Devuelve la URL generada si se ha creado correctamente
    return generatedUrl;
  } catch (e) {
    console.error('Error procesando la URL: ', e);
    return null;
  }
}
// Función para procesar la URL según el dominio rid-token
function processUrlRidToken(url) {
  try {
      return  processUrl(url);
    } catch (e) {
    return null;
    }
}
// Función para procesar la URL según el dominio noct-cint
function processUrlNoctCint(url) {
  try {
    // Obtener el dominio y los parámetros
    let domain = new URL(url).hostname;
    let arid = new URL(url).pathname.split('/')[2]; // Extraer el 'ca2e3c3b-8aec-42b4-8d25-a430509add93'
    let rid = new URL(url).searchParams.get('RID'); // Extraer el 'RID'

    let generatedUrl = '';

    // Verificar si el dominio es el esperado y los parámetros existen
    if (domain.includes('router.cint.com') && arid && rid) {
      // Generar la nueva URL con los parámetros obtenidos
      let token = '0749a007-a1d3-48c1-8ff3-12960c555867';
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
// Función para procesar la URL según el dominio invite
function processUrlInvite(url) {
  try {
    let domain = new URL(url).hostname; // Asegúrate de declarar la variable 'domain'
    let generatedUrl = '';

    if (domain.includes('ipsosinteractive.com')) {
      let proj = new URL(url).searchParams.get('id');
      let param = new URL(url).searchParams.get('param1');
      generatedUrl = `https://redirect.mindsharesurveys.com/v1/M7FMAqNSgNBiTKRoDbiNJ4YiXPN2cBin?proj=${param}&id=${proj}&status=1`;
    } else {
      return null; // Para los demás dominios, puedes manejar otro caso
    }
    return generatedUrl;
  } catch (e) {
    console.error('Error en la URL:', e);
    return null;
  }
}
// Función para procesar la URL según el dominio noct-poco-comunes
function processUrlNoctPocoComunes(url) {
  try {
    let domain = new URL(url).hostname;
    let token = '04651664-4715-4620-8f59-16a272ff3e4a'; // Token de Notch
    let pid1 = new URL(url).searchParams.get('pid1');
    let refid1 = new URL(url).searchParams.get('refid1');
    let rid = new URL(url).searchParams.get('rid');
    let generatedUrl = '';
    if (domain.includes('ovationworldpanel.com')) {
      // Se genera la nueva URL con los parámetros obtenidos
      generatedUrl = `https://notch.insights.supply/cb?token=${token}&pid1=${pid1}&refid1=${refid1}&rid=${rid}`;
    } else {
      throw new Error('URL no válida');
    }
    return generatedUrl;
  } catch (e) {
    return null;
  }
}
// Función para procesar la URL segun interno.js
function processUrlInterno(url) {
    try {
      let generatedUrl = null; // Inicializamos la variable para almacenar la URL generada
  
      // Primer bloque: Procesar URL con 'tsid'
      if (url.includes('tsid=')) {
        const regex = /tsid=([a-f0-9]{32})/;
        const match = url.match(regex);
        if (match) {
          const tsid = match[1]; // Extraemos el 'tsid' de la URL
          generatedUrl = `https://tssrvy.com/r/?st=1&tsid=${tsid}`; // Generamos la nueva URL
        }
      } 
      // Segundo bloque: Procesar URL con parámetros de Survey
      else if (url.includes('')) {
        let s2 = new URL(url).searchParams.get('s2');
        let rd_proj_ud = new URL(url).searchParams.get('rd_proj_ud');
        let rdud = new URL(url).searchParams.get('rdud');
        
        // Verificar si los parámetros necesarios existen
        if (!rd_proj_ud && !s2 && !rdud) return 'URL no válida';
  
        // Generar la URL con los parámetros disponibles
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
      // Tercer bloque: Procesar URL con dominio 'router.cint.com'
      else {
        let domain = new URL(url).hostname;
        let arid = new URL(url).pathname.split('/')[2];
        let rid = new URL(url).searchParams.get('RID');
  
        // Verificar si la URL tiene el dominio esperado y los parámetros necesarios
        if (domain.includes('router.cint.com') && arid && rid) {
          let token = '0749a007-a1d3-48c1-8ff3-12960c555867';
          generatedUrl = `https://notch.insights.supply/cb?token=${token}&RID=${rid}&cint_arid=${arid}`;
        } 
        // Si la URL es de 'router.cint.com' pero le faltan parámetros, retornamos 'URL no válida'
        else if (domain.includes('router.cint.com')) {
          return 'URL no válida';
        }
      }
  
      // Si no se generó ninguna URL válida, retornamos 'URL no válida'
      if (!generatedUrl) {
        return 'URL no válida';
      }
  
      return generatedUrl; // Retornamos la URL generada
  
    } catch (error) {
      // Si ocurre un error, se captura y se devuelve 'URL no válida'
      console.error('Error al procesar la URL:', error);
      return 'URL no válida';
    }
  }


// Event listener para el formulario
document.getElementById('urlForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const urlInput = document.getElementById('urlInput');
  const result = dispatchUrl(urlInput.value);
    const generatedUrl = document.getElementById('generatedUrl');
  if (result && result !== 'URL no válida') {
    document.getElementById('generatedTitle').classList.remove('hidden');
    generatedUrl.classList.remove('hidden');
    generatedUrl.innerText = result;
    document.getElementById('error').classList.add('hidden');
    copyToClipboard(result); // Copiar al portapapeles automáticamente
  } else {
      document.getElementById('generatedTitle').classList.add('hidden');
      generatedUrl.classList.add('hidden');
    document.getElementById('error').classList.remove('hidden');
  }
});
  function copyToClipboard(url) {
    navigator.clipboard.writeText(url).then(() => {
      let notification = document.getElementById('notification');
      notification.classList.remove('hidden');
      setTimeout(() => {
        notification.classList.add('hidden');
      }, 2000); // Ocultar notificación después de 2 segundos
    }).catch(() => {
      let notification = document.getElementById('notification');
      notification.classList.add('hidden');
        alert('Error al copiar al portapapeles');
    });
  }

document.getElementById('generatedUrl').addEventListener('click', function () {
  var el = document.createElement('textarea');
  el.value = this.innerText;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  document.getElementById('notification').classList.remove('hidden');
});
