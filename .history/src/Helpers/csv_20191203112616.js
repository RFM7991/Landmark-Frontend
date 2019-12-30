import Papa from 'papaparse'

export const parseCSV = (path) => {
  console.log('try', path)
  Papa.parse(path, (data) => {
    console.log('pp_data', data)
  })
}
