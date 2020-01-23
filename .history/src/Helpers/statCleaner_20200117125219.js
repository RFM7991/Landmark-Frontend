export const ageToPercentages = dataSet => {
    let percentages = JSON.parse(JSON.stringify(dataSet))
    let total = Object.entries(percentages).reduce((a,b) => {
        if ((a + b).toUpperCase().search('MEDIAN') <= -1)
            return a + b
    })
    console.log('AGE TOTAL')
}