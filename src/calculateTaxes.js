const isWithinLimit = ({ quantity, cost }) => (quantity * cost) >= 20000
const hasLoss = ({ media, cost }) => media > cost
const calculateTotal = ({ media, cost, quantity }) => (cost - media) * quantity
const calculateTax = (value) => value * 0.2
const isSellOperation = operation => operation === 'sell'

export const calculateTaxes = (operations) => {
  let initialState = { historic: [], media: 0, amount: 0, stocks: 0, loss: 0 }

  const updateState = ({ operation, quantity, cost }) => {
    const actualQuantity = (operation === 'sell' ? -quantity : quantity)

    let updatedMedia = initialState.media

    if (operation === 'buy') {
      initialState.historic.push({ quantity, cost })
      const amount = initialState.historic.reduce((acc, cur) => acc + (cur.quantity * cur.cost), 0)
      const stocks = initialState.historic.reduce((acc, cur) => acc + cur.quantity, 0)
      updatedMedia = amount / stocks
    }

    return {
      ...initialState,
      stocks: initialState.stocks + actualQuantity,
      amount: initialState.amount + (actualQuantity * cost),
      media: updatedMedia
    }
  }

  return operations.map(({ operation, quantity, 'unit-cost': cost }) => {
    initialState = { ...updateState({ operation, cost, quantity }) }

    if (isSellOperation(operation) &&
      !hasLoss({ media: initialState.media, cost }) &&
      isWithinLimit({ quantity, cost })
    ) {
      let total = calculateTotal({ media: initialState.media, cost, quantity })

      if (total <= initialState.loss) {
        initialState.loss -= total
        return { tax: 0 }
      }

      total -= initialState.loss
      initialState.loss = 0
      return { tax: calculateTax(total) }
    }

    initialState.loss = (initialState.media !== cost && operation === 'sell')
      ? initialState.loss + (quantity * (initialState.media - cost))
      : 0

    return { tax: 0 }
  })
}
