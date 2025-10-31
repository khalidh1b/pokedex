import { capitalizedText } from '@/utils/capitalizedText';

describe('capitalizedText', () => {
  it('should capitalize the first letter of a string', () => {
    expect(capitalizedText('hello')).toBe('Hello');
  });

  it('should return an empty string if the input is an empty string', () => {
    expect(capitalizedText('')).toBe('');
  });

  it('should handle strings with a single character', () => {
    expect(capitalizedText('a')).toBe('A');
  });
});
