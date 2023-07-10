import { calculateTaxes } from './calculateTaxes'

export const getTaxes = (operationsList) => {
  return operationsList.map(operations => calculateTaxes(operations))
}
