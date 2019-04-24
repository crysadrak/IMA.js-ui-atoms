import ComponentPositions from '../ComponentPositions';

import _window from '../mocks/window';

describe('ComponentPositions', () => {
  let windowViewportRect = {
    top: 0,
    left: 0,
    width: 1024,
    height: 768
  };

  let elmRect = {
    top: -70,
    left: 462,
    width: 100,
    height: 100
  };

  let componentPositions = null;

  beforeEach(() => {
    componentPositions = new ComponentPositions(_window);
  });

  it('should return window viewport', () => {
    let windowViewportRect = componentPositions.getWindowViewportRect();

    expect(windowViewportRect.top).toEqual(0);
    expect(windowViewportRect.left).toEqual(0);
    expect(typeof windowViewportRect.width).toEqual('number');
    expect(typeof windowViewportRect.left).toEqual('number');
  });

  describe('getNumberFromRange method', function() {
    it('should return number from defined range', function() {
      expect(componentPositions.getNumberFromRange(0, -1, 1)).toEqual(0);
    });

    it('should return defined min number from range', function() {
      expect(componentPositions.getNumberFromRange(-1, 0, 1)).toEqual(0);
    });

    it('should return defined max number from range', function() {
      expect(componentPositions.getNumberFromRange(2, 0, 1)).toEqual(1);
    });
  });

  describe('getRectsIntersection method', () => {
    it('should return penetration rect from two defined rects', () => {
      let penetrationRect = componentPositions.getRectsIntersection(
        windowViewportRect,
        elmRect
      );

      expect(penetrationRect.top).toEqual(windowViewportRect.top);
      expect(penetrationRect.left).toEqual(elmRect.left);
      expect(penetrationRect.width).toEqual(100);
      expect(penetrationRect.height).toEqual(30);
    });
  });

  describe('getPercentOfVisibility method', () => {
    it('should return percent of visibility on window viewport', () => {
      spyOn(componentPositions, 'getWindowViewportRect').and.returnValue(
        windowViewportRect
      );

      let percentOfVisibility = componentPositions.getPercentOfVisibility(
        elmRect
      );

      expect(percentOfVisibility).toEqual(30);
    });
  });

  describe('getBoundingClientRect method', () => {
    it('throw error for undefined element', () => {
      expect(() => {
        componentPositions.getBoundingClientRect();
      }).toThrow();
    });

    it('throw error for element without callable method getBoundingClientRect', () => {
      expect(() => {
        componentPositions.getBoundingClientRect({});
      }).toThrow();
    });

    it('should return expanded size for element', () => {
      let element = {
        getBoundingClientRect: () => elmRect
      };

      expect(
        componentPositions.getBoundingClientRect(element, {}, 300)
      ).toEqual({
        top: -370,
        left: 162,
        width: 700,
        height: 700
      });
    });

    it('should return zero size for invisible element', () => {
      let element = {
        getBoundingClientRect: () => {
          return { top: 0, left: 0, width: 0, height: 0 };
        }
      };

      expect(
        componentPositions.getBoundingClientRect(
          element,
          { width: 100, height: 100 },
          300
        )
      ).toEqual({
        top: 0,
        left: 0,
        width: 0,
        height: 0
      });
    });
  });
});
