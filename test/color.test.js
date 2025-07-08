import { expect } from 'chai';
import { getRandomColor, isColorDark } from '../utils/color.js';

describe('color utilities', function() {
  describe('getRandomColor', function() {
    it('should return a valid hex color string', function() {
      const color = getRandomColor();
      expect(color).to.match(/^#[0-9A-F]{6}$/);
    });

    it('should generate varying colors', function() {
      const colors = new Set(Array.from({ length: 5 }, getRandomColor));
      expect(colors.size).to.be.greaterThan(1);
    });
  });

  describe('isColorDark', function() {
    it('should identify dark colors', function() {
      expect(isColorDark('#000000')).to.be.true;
    });

    it('should identify light colors', function() {
      expect(isColorDark('#FFFFFF')).to.be.false;
    });
  });
});
