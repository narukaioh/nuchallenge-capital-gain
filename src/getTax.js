export const getTax = (operations) => {
  return operations.map(operation => ({ tax: 0 }))
}
