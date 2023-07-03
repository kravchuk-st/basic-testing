import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import fs from 'fs';
import path from 'path';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const func = jest.fn();
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(func, 1000);
    expect(setTimeout).toHaveBeenCalledWith(func, 1000);
  });

  test('should call callback only after timeout', () => {
    const func = jest.fn();
    doStuffByTimeout(func, 2000);
    expect(func).not.toBeCalled();
    jest.runAllTimers();
    expect(func).toBeCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const func = jest.fn();
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(func, 1000);
    expect(setInterval).toHaveBeenCalledWith(func, 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const func = jest.fn();
    doStuffByInterval(func, 1000);
    expect(func).not.toBeCalled();
    jest.advanceTimersByTime(2500);
    expect(func).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  jest.mock('fs');
  const src = './test.txt';
  const fileContent = 'Hello World!';

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should call join with pathToFile', async () => {
    const absoluteSrc = jest.spyOn(path, 'join').mockReturnValue(src);

    await readFileAsynchronously(src);
    expect(absoluteSrc).toHaveBeenCalledWith(__dirname, src);
  });

  test('should return null if file does not exist', async () => {
    const res = await readFileAsynchronously(src);
    expect(res).toBe(null);
  });

  test('should return file content if file exists', async () => {
    fs.existsSync = jest.fn().mockReturnValue(true);
    fs.promises.readFile = jest.fn().mockReturnValue(fileContent);

    const res = await readFileAsynchronously(src);
    expect(res).toEqual(fileContent);
  });
});
