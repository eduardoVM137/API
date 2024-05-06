import { multiplicador } from './resource/modulo.js';

describe('Pruebas de la función modulo', () => {
  test('2 * 2 debería ser 4', () => {
    expect(multiplicador(2, 2)).toBe(4);
  });

  test('El módulo por cero debería devolver 0', () => {
    expect(multiplicador(5, 0)).toBe(0);
  });

  test('-2 * 3 debería ser -6', () => {
    expect(multiplicador(-2, 3)).toBe(-6);
  });


});