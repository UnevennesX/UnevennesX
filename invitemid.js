export function processIpsos(url) {
  const proj = new URL(url).searchParams.get('id');
  const param = new URL(url).searchParams.get('param1');
  return `https://redirect.mindsharesurveys.com/v1/M7FMAqNSgNBiTKRoDbiNJ4YiXPN2cBin?proj=${param}&id=${proj}&status=1`;
}
