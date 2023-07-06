import { calculateTax } from './calculateTax'

/* eslint-disable quote-props */
describe('calculateTax', () => {
  test('should no pay any tax in a "buy" operations', () => {
    const operations = [[{ 'operation': 'buy', 'unit-cost': 10.00, 'quantity': 10000 }]]
    const expected = { tax: 0 }

    expect(calculateTax(operations)).toEqual(expected)
  })
})
