import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  return {
    ...originalModule,
    mockOne: () => 'one',
    mockTwo: () => 'two',
    mockThree: () => 'three',
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    expect(mockOne()).toBe('one');
    expect(mockTwo()).toBe('two');
    expect(mockThree()).toBe('three');
  });

  test('unmockedFunction should log into console', () => {
    const consoleLogSpy = jest.spyOn(global.console, 'log');

    unmockedFunction();
    expect(consoleLogSpy).toHaveBeenCalledWith('I am not mocked');
  });
});
