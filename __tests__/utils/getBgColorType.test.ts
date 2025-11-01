import { getBgColorType } from '@/utils/getBgColorType';

describe('getBgColorType', () => {
  it('should return the correct background color for a given type', () => {
    expect(getBgColorType('grass')).toBe('bg-[#1EBA11]');
    expect(getBgColorType('fire')).toBe('bg-[#EB6C6C]');
    expect(getBgColorType('water')).toBe('bg-[#009ACB]');
  });

  it('should return undefined for an unknown type', () => {
    expect(getBgColorType('unknown')).toBeUndefined();
  });
});
