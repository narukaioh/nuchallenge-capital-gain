import fs from 'fs'

export const readFile = filePath => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (error, data) => {
      if (error) {
        return reject(error)
      }
      return resolve(data)
    })
  })
}
