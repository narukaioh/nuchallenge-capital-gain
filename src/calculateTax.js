export const calculateTax = (operations) => {
  console.log({ operations })
  return operations.reduce((acc, cur) => {
    if (cur.operation === 'buy') {
      return { tax: 0 }
    }
    return { tax: 0 }
  }, { tax: 0 })
}
