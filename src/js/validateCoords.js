export default function validateCoords(coords) {
  const arr = coords.split(',');
  const latitude = arr[0].replace(/\[/, '');
  const longitude = arr[1].replace(/\]/, '').replace(/\s/, '');
  return `${latitude}, ${longitude}`;
}
