import { calculateTaxes } from './calculateTaxes'

/* eslint-disable quote-props */
describe('calculateTaxes', () => {
  test('should no pay any tax in a "buy" operations', () => {
    const operations = [{ 'operation': 'buy', 'unit-cost': 10.00, 'quantity': 10000 }]
    const expected = [{ tax: 0 }]

    expect(calculateTaxes(operations)).toEqual(expected)
  })

  test('should no pay any tax when the total operation value is less than R$ 20000', () => {
    const operations = [
      { 'operation': 'buy', 'unit-cost': 10.00, 'quantity': 100 },
      { 'operation': 'sell', 'unit-cost': 15.00, 'quantity': 50 },
      { 'operation': 'sell', 'unit-cost': 15.00, 'quantity': 50 }
    ]

    const expected = [{ tax: 0 }, { tax: 0 }, { tax: 0 }]
    expect(calculateTaxes(operations)).toEqual(expected)
  })

  test('should calculate the tax rate when a profit occurs on a "sell" operation', () => {
    const operations = [
      { 'operation': 'buy', 'unit-cost': 10.00, 'quantity': 10000 },
      { 'operation': 'sell', 'unit-cost': 20.00, 'quantity': 5000 }
    ]

    const expected = [{ tax: 0 }, { tax: 10000 }]
    expect(calculateTaxes(operations)).toEqual(expected)
  })

  test('should no pay any tax on operations that exist loss', () => {
    const operations = [
      { 'operation': 'buy', 'unit-cost': 10.00, 'quantity': 10000 },
      { 'operation': 'sell', 'unit-cost': 20.00, 'quantity': 5000 },
      { 'operation': 'sell', 'unit-cost': 5.00, 'quantity': 5000 }
    ]

    const expected = [{ tax: 0 }, { tax: 10000 }, { tax: 0 }]
    expect(calculateTaxes(operations)).toEqual(expected)
  })

  test('should deduct the loss when sell operations occur', () => {
    const operations = [
      { 'operation': 'buy', 'unit-cost': 10.00, 'quantity': 10000 },
      { 'operation': 'sell', 'unit-cost': 5.00, 'quantity': 5000 },
      { 'operation': 'sell', 'unit-cost': 20.00, 'quantity': 3000 }
    ]

    const expected = [{ tax: 0 }, { tax: 0 }, { tax: 1000 }]
    expect(calculateTaxes(operations)).toEqual(expected)
  })

  test('should calculate the weighted avarage price between two "buy" operations', () => {
    const operations = [
      { 'operation': 'buy', 'unit-cost': 10.00, 'quantity': 10000 },
      { 'operation': 'buy', 'unit-cost': 25.00, 'quantity': 5000 },
      { 'operation': 'sell', 'unit-cost': 15.00, 'quantity': 10000 }
    ]

    const expected = [{ tax: 0 }, { tax: 0 }, { tax: 0 }]
    expect(calculateTaxes(operations)).toEqual(expected)
  })

  test('should not charge taxes if the weighted average price and the operation price are equal', () => {
    const operations = [
      { 'operation': 'buy', 'unit-cost': 10.00, 'quantity': 10000 },
      { 'operation': 'buy', 'unit-cost': 25.00, 'quantity': 5000 },
      { 'operation': 'sell', 'unit-cost': 15.00, 'quantity': 10000 },
      { 'operation': 'sell', 'unit-cost': 25.00, 'quantity': 5000 }
    ]

    const expected = [{ tax: 0 }, { tax: 0 }, { tax: 0 }, { tax: 10000 }]
    expect(calculateTaxes(operations)).toEqual(expected)
  })

  test('should calculate rate after deducting loss', () => {
    const operations = [
      { 'operation': 'buy', 'unit-cost': 10.00, 'quantity': 10000 },
      { 'operation': 'sell', 'unit-cost': 2.00, 'quantity': 5000 },
      { 'operation': 'sell', 'unit-cost': 20.00, 'quantity': 2000 },
      { 'operation': 'sell', 'unit-cost': 20.00, 'quantity': 2000 },
      { 'operation': 'sell', 'unit-cost': 25.00, 'quantity': 1000 }
    ]

    const expected = [{ tax: 0 }, { tax: 0 }, { tax: 0 }, { tax: 0 }, { tax: 3000 }]
    expect(calculateTaxes(operations)).toEqual(expected)
  })
})
