import {
  isSellOperation,
  isDeductible, isWithinLimit,
  calculateTax, calculateWeightedAverage,
  calculateTotal, hasLoss, hasStocks
} from './utils'

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
