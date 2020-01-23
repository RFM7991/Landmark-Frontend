import { object } from "prop-types";

export const ageToPercentages = dataSet => {
    let percentages = JSON.parse(JSON.stringify(dataSet))
    object.entries(percentages).forEach(([key, value],i) => {
       console.log(value)
    });
    console.log('AGE TOTAL', total)
}