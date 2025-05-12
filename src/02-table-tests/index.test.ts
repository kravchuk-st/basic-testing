import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 3, action: Action.Add, expected: 4 },
  { a: 2, b: 4, action: Action.Add, expected: 6 },
  { a: 3, b: 7, action: Action.Add, expected: 10 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 12, b: 6, action: Action.Subtract, expected: 6 },
  { a: 8, b: 4, action: Action.Subtract, expected: 4 },
  { a: 8, b: 2, action: Action.Divide, expected: 4 },
  { a: 0, b: 5, action: Action.Divide, expected: 0 },
  { a: 16, b: 8, action: Action.Divide, expected: 2 },
  { a: 7, b: 3, action: Action.Multiply, expected: 21 },
  { a: 2, b: 4, action: Action.Multiply, expected: 8 },
  { a: 6, b: 3, action: Action.Multiply, expected: 18 },
  { a: 0, b: 2, action: Action.Exponentiate, expected: 0 },
  { a: 5, b: 2, action: Action.Exponentiate, expected: 25 },
  { a: 3, b: 4, action: Action.Exponentiate, expected: 81 },
  { a: 5, b: 2, action: '%', expected: null },
  { a: 7, b: 3, action: '++', expected: null },
  { a: 20, b: 8, action: '--', expected: null },
  { a: '4', b: 5, action: Action.Add, expected: null },
  { a: false, b: 5, action: Action.Add, expected: null },
  { a: undefined, b: 2, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should return correct results',
    ({ expected, a, action, b }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );
});
