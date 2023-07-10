import { stringToList } from '../../src/components/stringToList'

describe('stringToList', () => {
  test('should receive a string and return a javascript list', () => {
    const context =
      `[{ "x": 1, "y": 2}]
      [{"x":3, "y":2},{"x": 5, "y": 0}]`

    const expectedList = [[{ x: 1, y: 2 }], [{ x: 3, y: 2 }, { x: 5, y: 0 }]]
    expect(stringToList(context)).toEqual(expectedList)
  })
})
