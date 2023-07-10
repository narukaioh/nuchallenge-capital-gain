import fs from 'fs'
import { readFile } from '../../src/components/readFile'

jest.mock('fs')

describe('readFile', () => {
  test('should read file content correctly', async () => {
    const filePath = 'file.txt'
    const expectedContent = 'Hello, world!'

    const mockReadFile = jest.spyOn(fs, 'readFile')
    mockReadFile.mockImplementation((path, encoding, callback) => {
      callback(null, expectedContent)
    })

    const content = await readFile(filePath)
    expect(mockReadFile).toHaveBeenCalledWith(filePath, 'utf8', expect.any(Function))
    expect(content).toBe(expectedContent)
  })

  test('should handle file read error', async () => {
    const filePath = 'nonexistent.txt'
    const errorMessage = "ENOENT: no such file or directory, open 'nonexistent.txt'"

    const mockReadFile = jest.spyOn(fs, 'readFile')
    mockReadFile.mockImplementation((path, encoding, callback) => {
      callback(new Error(errorMessage))
    })

    await expect(readFile(filePath)).rejects.toThrow(errorMessage)
    expect(mockReadFile).toHaveBeenCalledWith(filePath, 'utf8', expect.any(Function))
  })
})
