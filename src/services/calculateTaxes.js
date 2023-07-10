const isWithinLimit = ({ quantity, cost }) => (quantity * cost) >= 20000

const hasLoss = ({ averageCost, cost }) => averageCost > cost

const calculateTotal = ({ averageCost, cost, quantity }) => (cost - averageCost) * quantity

const calculateTax = (value) => value * 0.2

const isSellOperation = (operation) => operation === 'sell'

const calculateWeightedAverage = (historic) => {
  const amount = historic.reduce((acc, cur) => acc + cur.quantity * cur.cost, 0)
  const stocks = historic.reduce((acc, cur) => acc + cur.quantity, 0)
  return amount / stocks
}

const isDeductible = (total, loss) => total <= loss

const hasStocks = (stocks) => stocks > 0

const updateState = (state, { operation, quantity, cost }) => {
  const actualQuantity = isSellOperation(operation) ? -quantity : quantity

  const historic = [...state.historic, { quantity, cost }]
  const averageCost = !isSellOperation(operation)
    ? calculateWeightedAverage(historic)
    : state.averageCost

  return {
    ...state,
    historic,
    stocks: state.stocks + actualQuantity,
    amount: state.amount + actualQuantity * cost,
    averageCost
  }
}

export const calculateTaxes = (operations) => {
  let state = {
    historic: [],
    averageCost: 0,
    amount: 0,
    stocks: 0,
    loss: 0
  }

  const calculateTaxForOperation = ({ operation, quantity, 'unit-cost': cost }) => {
    state = updateState(state, { operation, quantity, cost })

    if (
      isSellOperation(operation) &&
      !hasLoss({ averageCost: state.averageCost, cost }) &&
      isWithinLimit({ quantity, cost })
    ) {
      let total = calculateTotal({
        averageCost: state.averageCost,
        cost,
        quantity
      })

      if (isDeductible(total, state.loss)) {
        state.loss -= total
        return { tax: 0 }
      }

      total -= state.loss
      state.loss = 0

      if (!hasStocks(state.stocks)) {
        state.historic = []
        state.averageCost = 0
      }

      return { tax: calculateTax(total) }
    }

    state.loss =
      state.averageCost !== cost && isSellOperation(operation)
        ? state.loss + quantity * (state.averageCost - cost)
        : 0

    return { tax: 0 }
  }

  return operations.map(calculateTaxForOperation)
}
