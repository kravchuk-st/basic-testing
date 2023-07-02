import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

const value = 21;
const errMsg = 'Error message';
const customError = new MyAwesomeError();

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const result = await resolveValue(value);
    expect(result).toBe(value);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => throwError(errMsg)).toThrow(errMsg);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow();
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrowError(customError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    expect(rejectCustomError()).rejects.toThrowError(customError);
  });
});
