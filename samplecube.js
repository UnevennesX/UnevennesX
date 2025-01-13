export function processSampleCube(url) {
  const rid = new URL(url).searchParams.get('RID');
  return `https://surveys.sample-cube.com/ending?RS=1&RID=${rid}&secret=1574`;
}
