import { getColorType } from '@/utils/getColorType';

describe('getColorType', () => {
  it('should return the correct color for a given type', () => {
    expect(getColorType('grass')).toBe('bg-[#80E177]');
    expect(getColorType('fire')).toBe('bg-[#FF6464]');
    expect(getColorType('water')).toBe('bg-[#9FF3FF]');
  });

  it('should return undefined for an unknown type', () => {
    expect(getColorType('unknown')).toBeUndefined();
  });
});
