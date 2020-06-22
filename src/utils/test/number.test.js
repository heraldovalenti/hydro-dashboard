import { withThousandSeparator, abreviationFormatter } from './../number';

describe('Number', () => {
  describe('withThousandSeparator', () => {
    it('5000 should be equal to 5,000', () => {
      const num = 5000;
      expect(withThousandSeparator(num)).toEqual('5,000');
    });
    it('1000000 should be equal to 1,000,000', () => {
      const num = 1000000;
      expect(withThousandSeparator(num)).toEqual('1,000,000');
    });
  });

  describe('abreviationFormatter', () => {
    it('5000 should be equal to 5,000', () => {
      const num = 5100;
      expect(abreviationFormatter(num, 1)).toEqual('5.1k');
    });
    it('1000000 should be equal to 1,000,000', () => {
      const num = 1000000;
      expect(abreviationFormatter(num, 0)).toEqual('1M');
    });
  });
});
