import validateCoords from '../validateCoords';

const result = '51.50851, -0.12572';
test('test1', () => {
  expect(validateCoords('51.50851, -0.12572')).toBe(result);
});

test('test2', () => {
  expect(validateCoords('51.50851,-0.12572')).toBe(result);
});

test('test3', () => {
  expect(validateCoords('[51.50851, -0.12572]')).toBe(result);
});
