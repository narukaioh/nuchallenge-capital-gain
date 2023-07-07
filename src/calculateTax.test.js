import { calculateTax } from './calculateTax'

/* eslint-disable quote-props */
describe('calculateTax', () => {
  test('should no pay any tax in a "buy" operations', () => {
    const operations = [{ 'operation': 'buy', 'unit-cost': 10.00, 'quantity': 10000 }]
    const expected = [{ tax: 0 }]

    expect(calculateTax(operations)).toEqual(expected)
  })

  test('should no pay any tax in a "sell" operation at a loss in the transaction', () => {
    const operations = [
      { 'operation': 'buy', 'unit-cost': 10.00, 'quantity': 10000 },
      { 'operation': 'sell', 'unit-cost': 5.00, 'quantity': 10000 }
    ]

    const expected = [{ tax: 0 }, { tax: 0 }]
    expect(calculateTax(operations)).toEqual(expected)
  })
})
