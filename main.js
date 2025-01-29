// main.js
function dispatchUrl(url) {
    // Definir el orden de prioridad o lógica
    if (url.includes('surveys.sago.com')) {
        return processUrlSampleCube(url); // sample-cube.js
    } else if (url.includes('qualtrics.com') || url.includes('questionlab.com') || url.includes('surveys.audience-align.com') || url.includes('insights.surveynavigate.app')) {
        return processUrlNoctComun(url); // noct-comun.js
    } else if (url.includes('lumen-research.com')) {
        return processUrlRidToken(url); // rid-token.js
    } else if (url.includes('router.cint.com')) {
        return processUrlNoctCint(url); // noct-cint.js
    } else if (url.includes('ovationworldpanel.com')) {
        return processUrlNoctPocoComunes(url); // noct-poco-comunes.js
    } else if (url.includes('ipsosinteractive.com')) {
        return processUrlInvite(url); // invite.js
    } else if (url.includes('walr.com/surveyin')) {
        return processUrlWalr(url); // walr.js
    } else if (url.includes('tsid=') || url.includes('rd_proj_ud=') || url.includes('s2=') || url.includes('rdud=')) {
        return processUrlInterno(url); // interno.js
    }

    return null; // Si no coincide con ninguna función, devuelve null
}

// Función para procesar la URL de Sample Cube
function processUrlSampleCube(url) {
    let domain = new URL(url).hostname;
    let generatedUrl = '';
    if (domain === 'surveys.sago.com') {
        let rid = new URL(url).searchParams.get('RID');
        generatedUrl = `https://surveys.sample-cube.com/ending?RS=1&RID=${rid}&secret=1574`;
    }
    return generatedUrl;
}

// Función para procesar URLs comunes (Notch)
function processUrlNoctComun(url) {
    try {
        let domain = new URL(url).hostname;
        let token = '';
        let rid = '';
        let generatedUrl = '';

        if (domain.includes('qualtrics.com')) {
            token = '5a9c985a-f633-46a5-925c-6ca593f1a8b0';
            rid = new URL(url).searchParams.get('rnid');
            generatedUrl = `https://notch.insights.supply/cb?token=${token}&RID=${rid}`;
        } else if (domain.includes('questionlab.com')) {
            token = '9575fc16-0317-4608-93e9-b477730e37ac';
            rid = new URL(url).searchParams.get('RID');
            generatedUrl = `https://notch.insights.supply/cb?token=${token}&RID=${rid}`;
        } else if (domain.includes('surveys.audience-align.com')) {
            token = 'cb8f4af5-0173-44b1-802a-8c7d5cabd9e3';
            rid = new URL(url).searchParams.get('uid');
            if (rid) {
                generatedUrl = `https://notch.insights.supply/cb?token=${token}&RID=${rid}`;
            } else {
                console.error('No se pudo extraer el UID de la URL proporcionada.');
                return null;
            }
        } else if (domain.includes('insights.surveynavigate.app')) {
            token = '07acc3b2-400d-4219-8c33-67eb3257720f';
            rid = new URL(url).searchParams.get('uid');
            if (rid) {
                generatedUrl = `https://notch.insights.supply/cb?token=${token}&RID=${rid}`;
            } else {
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

// Función para procesar URLs de Lumen Research
function processUrlRidToken(url) {
    let domain = new URL(url).hostname;
    let generatedUrl = '';

    if (domain.includes('lumen-research.com')) {
        let token = '034287b2-1ca0-48d1-9e45-f5ca740ef529';
        let participant = new URL(url).searchParams.get('participant');
        if (participant) {
            generatedUrl = `https://notch.insights.supply/cb?RID=${participant}&token=${token}`;
        }
    }
    return generatedUrl;
}

// Función para procesar URLs de Cint
function processUrlNoctCint(url) {
    try {
        let domain = new URL(url).hostname;
        let arid = new URL(url).pathname.split('/')[2];
        let rid = new URL(url).searchParams.get('RID');

        let generatedUrl = '';

        if (domain.includes('router.cint.com') && arid && rid) {
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

// Función para procesar URLs de Ipsos Interactive
function processUrlInvite(url) {
    try {
        let domain = new URL(url).hostname;
        let generatedUrl = '';

        if (domain.includes('ipsosinteractive.com')) {
            let proj = new URL(url).searchParams.get('id');
            let param = new URL(url).searchParams.get('param1');
            generatedUrl = `https://redirect.mindsharesurveys.com/v1/M7FMAqNSgNBiTKRoDbiNJ4YiXPN2cBin?proj=${param}&id=${proj}&status=1`;
        } else {
            return null;
        }
        return generatedUrl;
    } catch (e) {
        console.error('Error en la URL:', e);
        return null;
    }
}

// Función para procesar URLs poco comunes
function processUrlNoctPocoComunes(url) {
    try {
        let domain = new URL(url).hostname;
        let token = '04651664-4715-4620-8f59-16a272ff3e4a';
        let pid1 = new URL(url).searchParams.get('pid1');
        let refid1 = new URL(url).searchParams.get('refid1');
        let rid = new URL(url).searchParams.get('rid');
        let generatedUrl = '';
        if (domain.includes('ovationworldpanel.com')) {
            generatedUrl = `https://notch.insights.supply/cb?token=${token}&pid1=${pid1}&refid1=${refid1}&rid=${rid}`;
        } else {
            throw new Error('URL no válida');
        }
        return generatedUrl;
    } catch (e) {
        return null;
    }
}

// Función para procesar URLs internas
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
        } else {
            let s2 = new URL(url).searchParams.get('s2');
            let s2 = new URL(url).searchParams.get('rrid');
            let s2 = new URL(url).searchParams.get('rid');
            let rd_proj_ud = new URL(url).searchParams.get('rd_proj_ud');
            let rdud = new URL(url).searchParams.get('rdud');

            if (s2 && rdud) {
                generatedUrl = `https://www.rdsecured.com/return?inbound_code=1000&rdud=${rdud}&rd_proj_ud=${rd_proj_ud}`;
            } else if (s2) {
                generatedUrl = `https://www.rdsecured.com/return?inbound_code=1000&rdud=${s2}&rd_proj_ud=${rd_proj_ud}`;
            } else if (rdud) {
                generatedUrl = `https://www.rdsecured.com/return?inbound_code=1000&rdud=${rdud}&rd_proj_ud=${rd_proj_ud}`;
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

// Nueva función para procesar URLs de Walr
function processUrlWalr(url) {
    try {
        let domain = new URL(url).hostname;
        let generatedUrl = '';

        if (domain.includes('walr.com')) {
            let rid = new URL(url).searchParams.get('id');
            let token = '288a1257-09e2-43e3-8765-e0c35d1affad';
            generatedUrl = `https://notch.insights.supply/cb?token=${token}&RID=${id}`;
        }

        return generatedUrl;
    } catch (e) {
        console.error('Error procesando la URL de Walr:', e);
        return null;
    }
}

document.getElementById('urlForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const urlInput = document.getElementById('urlInput');
    const result = dispatchUrl(urlInput.value);
    if (result) {
        document.getElementById('generatedTitle').classList.remove('hidden');
        document.getElementById('generatedUrl').classList.remove('hidden');
        document.getElementById('generatedUrl').innerText = result;
        document.getElementById('error').classList.add('hidden');
    } else {
        document.getElementById('generatedTitle').classList.add('hidden');
        document.getElementById('generatedUrl').classList.add('hidden');
        document.getElementById('error').classList.remove('hidden');
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
