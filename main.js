// main.js

function dispatchUrl(url) {
    try {
        // Definir el orden de prioridad o lógica
        if (url.includes('surveys.sago.com')) {
            return processUrlSampleCube(url);
        } else if (
            url.includes('qualtrics.com') || 
            url.includes('questionlab.com') || 
            url.includes('surveys.audience-align.com') || 
            url.includes('insights.surveynavigate.app')
        ) {
            return processUrlNoctComun(url);
        } else if (url.includes('lumen-research.com')) {
            return processUrlRidToken(url);
        } else if (url.includes('router.cint.com')) {
            return processUrlNoctCint(url);
        } else if (url.includes('ovationworldpanel.com')) {
            return processUrlNoctPocoComunes(url);
        } else if (url.includes('ipsosinteractive.com')) {
            return processUrlInvite(url);
        } else if (url.includes('tsid=') || url.includes('rd_proj_ud=') || url.includes('s2=') || url.includes('rdud=')) {
            return processUrlInterno(url);
        }

        return null; // Si no coincide con ninguna función, devuelve null
    } catch (e) {
        console.error('Error procesando la URL:', e);
        return null;
    }
}

// Funciones para procesar las URLs
function processUrlSampleCube(url) {
    const rid = new URL(url).searchParams.get('RID');
    return rid ? `https://surveys.sample-cube.com/ending?RS=1&RID=${rid}&secret=1574` : null;
}

function processUrlNoctComun(url) {
    const domain = new URL(url).hostname;
    let token, rid;

    if (domain.includes('qualtrics.com')) {
        token = '5a9c985a-f633-46a5-925c-6ca593f1a8b0';
        rid = new URL(url).searchParams.get('rnid');
    } else if (domain.includes('questionlab.com')) {
        token = '9575fc16-0317-4608-93e9-b477730e37ac';
        rid = new URL(url).searchParams.get('RID');
    } else if (domain.includes('surveys.audience-align.com') || domain.includes('insights.surveynavigate.app')) {
        token = domain.includes('audience-align.com') 
            ? 'cb8f4af5-0173-44b1-802a-8c7d5cabd9e3' 
            : '07acc3b2-400d-4219-8c33-67eb3257720f';
        rid = new URL(url).searchParams.get('uid');
    }

    return rid ? `https://notch.insights.supply/cb?token=${token}&RID=${rid}` : null;
}

function processUrlRidToken(url) {
    const participant = new URL(url).searchParams.get('participant');
    return participant 
        ? `https://notch.insights.supply/cb?RID=${participant}&token=034287b2-1ca0-48d1-9e45-f5ca740ef529` 
        : null;
}

function processUrlNoctCint(url) {
    const arid = new URL(url).pathname.split('/')[2];
    const rid = new URL(url).searchParams.get('RID');

    return arid && rid 
        ? `https://notch.insights.supply/cb?token=0749a007-a1d3-48c1-8ff3-12960c555867&RID=${rid}&cint_arid=${arid}` 
        : null;
}

function processUrlNoctPocoComunes(url) {
    const pid1 = new URL(url).searchParams.get('pid1');
    const refid1 = new URL(url).searchParams.get('refid1');
    const rid = new URL(url).searchParams.get('rid');

    return pid1 && refid1 && rid 
        ? `https://notch.insights.supply/cb?token=04651664-4715-4620-8f59-16a272ff3e4a&pid1=${pid1}&refid1=${refid1}&rid=${rid}` 
        : null;
}

function processUrlInvite(url) {
    const proj = new URL(url).searchParams.get('id');
    const param = new URL(url).searchParams.get('param1');
    return proj && param 
        ? `https://redirect.mindsharesurveys.com/v1/M7FMAqNSgNBiTKRoDbiNJ4YiXPN2cBin?proj=${param}&id=${proj}&status=1` 
        : null;
}

function processUrlInterno(url) {
    const tsidMatch = url.match(/tsid=([a-f0-9]{32})/);
    if (tsidMatch) {
        return `https://tssrvy.com/r/?st=1&tsid=${tsidMatch[1]}`;
    }

    const s2 = new URL(url).searchParams.get('s2');
    const rd_proj_ud = new URL(url).searchParams.get('rd_proj_ud');
    const rdud = new URL(url).searchParams.get('rdud');

    return s2 && rdud 
        ? `https://www.rdsecured.com/return?inbound_code=1000&rdud=${rdud}&rd_proj_ud=${rd_proj_ud}` 
        : rd_proj_ud 
        ? `https://www.rdsecured.com/return?inbound_code=1000&rd_proj_ud=${rd_proj_ud}` 
        : null;
}

// Evento para manejar el formulario
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

document.getElementById('generatedUrl').addEventListener('click', function () {
    const el = document.createElement('textarea');
    el.value = this.innerText;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    document.getElementById('notification').classList.remove('hidden');
});
