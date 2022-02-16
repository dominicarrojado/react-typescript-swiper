import faker from 'faker';
import { getTouchEventData } from '../dom';

describe('dom utilities', () => {
  describe('getTouchEventData()', () => {
    it('should return first of changed touches', () => {
      const changedTouch = {
        clientX: faker.datatype.number(),
        clientY: faker.datatype.number(),
      };
      const touchEvent = {
        changedTouches: [changedTouch],
      } as any;

      expect(getTouchEventData(touchEvent)).toEqual(changedTouch);
    });

    it('should handle undefined changedTouches', () => {
      const mouseEvent = {
        clientX: faker.datatype.number(),
        clientY: faker.datatype.number(),
      } as any;

      expect(getTouchEventData(mouseEvent)).toEqual(mouseEvent);
    });
  });
});
