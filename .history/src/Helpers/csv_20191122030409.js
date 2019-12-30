import PParser from 'papaparse'

export const parseCSV = (path) => {
  console.log('try', path)
  PParser.parse(path, (data) => {
    console.log('pp_data', data)
  })
}