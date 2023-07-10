import {
  isWithinLimit,
  hasLoss,
  calculateTotal,
  calculateTax,
  isSellOperation,
  calculateWeightedAverage,
  isDeductible,
  hasStocks
} from '../../../src/services/utils'

describe('isWithinLimit', () => {
  test('should return true if quantity * cost is greater than or equal to 20000', () => {
    const result = isWithinLimit({ quantity: 100, cost: 250 })
    expect(result).toBe(true)
  })

  test('should return false if quantity * cost is less than 20000', () => {
    const result = isWithinLimit({ quantity: 50, cost: 300 })
    expect(result).toBe(false)
  })
})

describe('hasLoss', () => {
  test('should return true if averageCost is greater than cost', () => {
    const result = hasLoss({ averageCost: 1000, cost: 800 })
    expect(result).toBe(true)
  })

  test('should return false if averageCost is less than or equal to cost', () => {
    const result = hasLoss({ averageCost: 500, cost: 600 })
    expect(result).toBe(false)
  })
})

describe('calculateTotal', () => {
  test('should calculate the total correctly', () => {
    const result = calculateTotal({ averageCost: 500, cost: 600, quantity: 10 })
    expect(result).toBe(1000)
  })
})

describe('calculateTax', () => {
  test('should calculate the tax correctly', () => {
    const result = calculateTax(1000)
    expect(result).toBe(200)
  })
})

describe('isSellOperation', () => {
  test('should return true if operation is "sell"', () => {
    const result = isSellOperation('sell')
    expect(result).toBe(true)
  })

  test('should return false if operation is not "sell"', () => {
    const result = isSellOperation('buy')
    expect(result).toBe(false)
  })
})

describe('calculateWeightedAverage', () => {
  test('should calculate the weighted average correctly', () => {
    const historic = [{ quantity: 5, cost: 100 }, { quantity: 10, cost: 200 }]
    const result = calculateWeightedAverage(historic)
    expect(result).toBe(166.67)
  })
})

describe('isDeductible', () => {
  test('should return true if total is less than or equal to loss', () => {
    const result = isDeductible(500, 1000)
    expect(result).toBe(true)
  })

  test('should return false if total is greater than loss', () => {
    const result = isDeductible(1500, 1000)
    expect(result).toBe(false)
  })
})

describe('hasStocks', () => {
  test('should return true if stocks is greater than 0', () => {
    const result = hasStocks(10)
    expect(result).toBe(true)
  })

  test('should return false if stocks is 0', () => {
    const result = hasStocks(0)
    expect(result).toBe(false)
  })
})
