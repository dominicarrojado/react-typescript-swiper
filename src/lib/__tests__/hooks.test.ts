import { renderHook, act } from '@testing-library/react-hooks';
import faker from 'faker';
import { getRefValue, useStateRef } from '../hooks';

describe('hooks utilities', () => {
  describe('getRefValue()', () => {
    it('should return expected value', () => {
      const node = 'node';
      const ref = { current: node };

      expect(getRefValue(ref)).toBe(node);
    });
  });

  describe('useStateRef()', () => {
    it('should return expected array', () => {
      const initialValue = faker.datatype.string();
      const view = renderHook(() => useStateRef(initialValue));
      const [state, setState, ref] = view.result.current;

      expect(state).toBe(initialValue);
      expect(typeof setState).toBe('function');
      expect(ref).toEqual({ current: initialValue });
    });

    it('should update state and ref', () => {
      const initialValue = faker.datatype.string();
      const newValue = faker.datatype.string();
      const view = renderHook(() => useStateRef(initialValue));
      const [_state, setState] = view.result.current;

      act(() => {
        setState(newValue);
      });

      const [state, _setState, ref] = view.result.current;

      expect(state).toBe(newValue);
      expect(ref).toEqual({ current: newValue });
    });
  });
});
