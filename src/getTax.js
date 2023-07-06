import { calculateTax } from './calculateTax'

export const getTax = (operationsList) => {
  return operationsList.map(operations => calculateTax(operations))
}
