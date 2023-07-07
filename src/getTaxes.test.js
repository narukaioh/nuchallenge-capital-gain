/* eslint-disable quote-props */

import { getTaxes } from './getTaxes'

describe('getTaxes', () => {
  test('should return a tax object for each operation', () => {
    const operations1 = [[{ 'operation': '', 'unit-cost': 0, 'quantity': 0 }]]
    const operations2 = [
      [{ 'operation': '', 'unit-cost': 0, 'quantity': 0 }],
      [{ 'operation': '', 'unit-cost': 0, 'quantity': 0 }, { 'operation': '', 'unit-cost': 0, 'quantity': 0 }]
    ]

    const expected1 = [[{ 'tax': expect.any(Number) }]]
    const expected2 = [
      [{ 'tax': expect.any(Number) }],
      [{ 'tax': expect.any(Number) }, { 'tax': expect.any(Number) }]
    ]

    expect(getTaxes(operations1)).toEqual(expected1)
    expect(getTaxes(operations2)).toEqual(expected2)
  })
})
