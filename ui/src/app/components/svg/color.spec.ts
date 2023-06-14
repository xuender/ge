import { darkenHex } from './color';

describe('color', () => {
  it('darken', () => {
    expect('#008000').toEqual(darkenHex('#00FF00'));
  });
});
