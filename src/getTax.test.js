/* eslint-disable quote-props */

import { getTax } from './getTax'

describe('getTax', () => {
  test('should return a tax object for each operation', () => {
    const operations = [[{ 'operation': '', 'unit-cost': 0, 'quantity': 0 }]]
    const expected = [[{ 'tax': expect.any(Number) }]]

    expect(getTax(operations)).toEqual(expected)
  })
})
