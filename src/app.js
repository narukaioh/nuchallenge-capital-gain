import { getTax } from './getTax'
import { readFile } from './utils/readFile'
import { stringToList } from './utils/stringToList'

const init = async () => {
  const filePath = process.argv[2]
  const strings = await readFile(filePath)
  const lists = stringToList(strings)
  const result = getTax(lists)

  console.log(result)
}

init()
