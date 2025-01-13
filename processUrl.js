import { processSampleCube } from './samplecube.js';
import { processIpsos } from './invitemid.js';
import { processQualtrics, processQuestionLab, processLumen, processAudienceAlign, processSurveyNavigate } from './samplicious.js';

export function processUrl(url) {
  try {
    const domain = new URL(url).hostname;
    let generatedUrl = '';

    if (domain.includes('qualtrics.com')) {
      generatedUrl = processQualtrics(url);
    } else if (domain.includes('questionlab.com')) {
      generatedUrl = processQuestionLab(url);
    } else if (domain.includes('lumen-research.com')) {
      generatedUrl = processLumen(url);
    } else if (domain.includes('ipsosinteractive.com')) {
      generatedUrl = processIpsos(url);
    } else if (domain === 'surveys.sago.com') {
      generatedUrl = processSampleCube(url);
    } else if (domain.includes('surveys.audience-align.com')) {
      generatedUrl = processAudienceAlign(url);
    } else if (domain.includes('insights.surveynavigate.app')) {
      generatedUrl = processSurveyNavigate(url);
    } else {
      return null;
    }

    return generatedUrl;
  } catch (e) {
    console.error('Error procesando la URL:', e);
    return null;
  }
}
