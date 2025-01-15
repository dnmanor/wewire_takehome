import { calculateConversion } from '../convert.service';

describe('Convert Functions', () => {
  describe('calculateConversion', () => {
    it('should return same amount when currencies are the same', () => {
      const result = calculateConversion(100, 'GHS', 'GHS', 1);
      expect(result).toBe(100);
    });

    it('should correctly convert using exchange rate', () => {
      const result = calculateConversion(100, 'USD', 'EUR', 0.85);
      expect(result).toBe(85);
    });

    it('should handle zero amount', () => {
      const result = calculateConversion(0, 'USD', 'EUR', 0.85);
      expect(result).toBe(0);
    });
  });
}); 