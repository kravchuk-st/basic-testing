import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  const list = generateLinkedList([1, 2]);
  test('should generate linked list from values 1', () => {
    expect(list).toStrictEqual({
      next: {
        next: {
          next: null,
          value: null,
        },
        value: 2,
      },
      value: 1,
    });
  });

  test('should generate linked list from values 2', () => {
    expect(list).toMatchInlineSnapshot(`
      {
        "next": {
          "next": {
            "next": null,
            "value": null,
          },
          "value": 2,
        },
        "value": 1,
      }
    `);
  });
});
