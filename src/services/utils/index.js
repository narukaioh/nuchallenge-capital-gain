export const isWithinLimit = ({ quantity, cost }) => (quantity * cost) >= 20000

export const hasLoss = ({ averageCost, cost }) => averageCost > cost

export const calculateTotal = ({ averageCost, cost, quantity }) => (cost - averageCost) * quantity

export const calculateTax = (value) => value * 0.2

export const isSellOperation = (operation) => operation === 'sell'

export const calculateWeightedAverage = (historic) => {
  const amount = historic.reduce((acc, cur) => acc + cur.quantity * cur.cost, 0)
  const stocks = historic.reduce((acc, cur) => acc + cur.quantity, 0)
  return Number((amount / stocks).toFixed(2))
}

export const isDeductible = (total, loss) => total <= loss

export const hasStocks = (stocks) => stocks > 0
