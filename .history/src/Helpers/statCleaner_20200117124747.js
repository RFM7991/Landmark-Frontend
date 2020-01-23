export const ageToPercentages = arr => {
    let percentages = JSON.parse(JSON.stringify(arr))
    let total = percentages.reduce((a,b) => {
        if ((a + b).toUpperCase().search('MEDIAN') <= -1)
            return a + b
    })
    
}