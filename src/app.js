import { getTaxes } from './services/getTaxes'
import { readFile } from './components/readFile'
import { stringToList } from './components/stringToList'

const init = async () => {
  const filePath = process.argv[2]
  const strings = await readFile(filePath)
  const lists = stringToList(strings)
  const result = getTaxes(lists)

  console.log(result)
}

init()
