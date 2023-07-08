const isWithinLimit = ({ quantity, cost }) => (quantity * cost) >= 20000

const hasLoss = ({ media, cost }) => media > cost

const calculateTax = ({ media, cost, quantity, loss }) => (((cost - media) * quantity) - loss) * 0.2

export const calculateTaxes = (operations) => {
  const initialState = { historic: [], media: 0, amount: 0, stocks: 0, loss: 0 }

  return operations.map(({ operation, quantity, 'unit-cost': cost }) => {
    const actualQuantity = (operation === 'sell' ? -quantity : quantity)
    let tax = 0

    initialState.stocks = initialState.stocks + actualQuantity
    initialState.amount = initialState.amount + (actualQuantity * cost)

    if (operation === 'buy') {
      initialState.historic.push({ quantity, cost })
      const amount = initialState.historic.reduce((acc, cur) => acc + (cur.quantity * cur.cost), 0)
      const stocks = initialState.historic.reduce((acc, cur) => acc + cur.quantity, 0)
      initialState.media = amount / stocks
    }

    if (operation === 'sell' && isWithinLimit({ quantity, cost }) && !hasLoss({ media: initialState.media, cost })) {
      // if (initialState.loss >= 0) {
      //   initialState.loss = initialState.loss + (quantity * (initialState.media - cost))
      // }

      const params = {
        loss: initialState.loss,
        media: initialState.media,
        cost,
        quantity
      }

      // return {
      //   tax: initialState.loss >= 0 ? calculateTax(params) : 0
      // }
      tax = calculateTax(params)
    }

    if (operation === 'sell' && hasLoss({ media: initialState.media, cost })) {
      initialState.loss = (initialState.media !== cost)
        ? initialState.loss + (quantity * (initialState.media - cost))
        : 0
    }

    return { tax }
  })
}
