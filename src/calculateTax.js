export const calculateTax = (operations) => {
  const state = { total: 0, amount: 0 }

  return operations.map((state, transaction) => {
    const { operation, quantity, 'unit-cost': unitCost } = transaction
    const nowQuantity = operation === 'sell' ? -quantity : quantity
    let tax = 0

    const lastAmount = state.total
    state.total = state.total + nowQuantity
    state.amount = state.amount + nowQuantity * unitCost

    if (operation === 'sell') {
      tax = (lastAmount > state.total) ? 0 : 10000
    }
    return { tax }
  })
}
