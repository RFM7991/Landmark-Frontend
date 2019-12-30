import PParser from 'papaparse'

export const parseCSV = (path) => {
  PParser.parse(path, (data) => {
    console.log('pp', data)
  })
}