import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => {
  const lodashModule = jest.requireActual('lodash');
  return {
    __esModule: true,
    ...lodashModule,
    throttle: jest.fn((fn) => fn),
  };
});

describe('throttledGetDataFromApi', () => {
  const url = '/test';
  const mock = axios as jest.Mocked<typeof axios>;

  beforeEach(() => {
    mock.create = jest.fn(() => mock);
    mock.get.mockImplementationOnce(() => Promise.resolve({ data: url }));
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(url);
    expect(mock.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(url);
    expect(mock.get).toHaveBeenCalledWith(url);
  });

  test('should return response data', async () => {
    mock.get.mockResolvedValueOnce(url);
    expect(await throttledGetDataFromApi(url)).toEqual(url);
  });
});
