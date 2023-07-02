import { simpleCalculator, Action } from './index';
const a = 4;
const b = 2;

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const action = Action.Add;
    const result = simpleCalculator({ a, b, action });
    expect(result).toBe(6);
  });

  test('should subtract two numbers', () => {
    const action = Action.Subtract;
    const result = simpleCalculator({ a, b, action });
    expect(result).toBe(2);
  });

  test('should multiply two numbers', () => {
    const action = Action.Multiply;
    const result = simpleCalculator({ a, b, action });
    expect(result).toBe(8);
  });

  test('should divide two numbers', () => {
    const action = Action.Divide;
    const result = simpleCalculator({ a, b, action });
    expect(result).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    const action = Action.Exponentiate;
    const result = simpleCalculator({ a, b, action });
    expect(result).toBe(16);
  });

  test('should return null for invalid action', () => {
    const action = undefined || null;
    const result = simpleCalculator({ a, b, action });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const action = Action.Add;
    const a = '4';
    const result = simpleCalculator({ a, b, action });
    expect(result).toBeNull();
  });
});
