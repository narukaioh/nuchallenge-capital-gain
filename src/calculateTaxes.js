const isWithinLimit = ({ quantity, cost }) => (quantity * cost) >= 20000

const hasLoss = ({ media, cost }) => media < cost

const calculateTax = ({ media, cost, quantity }) => ((cost - media) * quantity) * 0.2

export const calculateTaxes = (operations) => {
  const initialState = { historic: [], media: 0, amount: 0, stocks: 0 }

  return operations.map(({ operation, quantity, 'unit-cost': cost }) => {
    const actualQuantity = (operation === 'sell' ? -quantity : quantity)

    initialState.stocks = initialState.stocks + actualQuantity
    initialState.amount = initialState.amount + (actualQuantity * cost)

    if (operation === 'buy') {
      initialState.historic.push({ quantity, cost })
      const amount = initialState.historic.reduce((acc, cur) => acc + (cur.quantity * cur.cost), 0)
      const stocks = initialState.historic.reduce((acc, cur) => acc + cur.quantity, 0)
      initialState.media = amount / stocks
    }

    if (operation === 'sell' && isWithinLimit({ quantity, cost }) && hasLoss({ media: initialState.media, cost })) {
      return { tax: calculateTax({ media: initialState.media, cost, quantity }) }
    }

    return { tax: 0 }
  })
}
