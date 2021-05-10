export * from "./DOMcode";
export * from "./pagination";
export * from "./dateParser";
export * from "./sorter";
export * from "./createNotification";

export const isObjectEmpty = obj => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export const getRandomInArray = (arr, numberOfElements) => {
    // Shuffle array
    const shuffled = arr.sort(() => 0.5 - Math.random());

    // Get sub-array of first n elements after shuffled
    let selected = shuffled.slice(0, numberOfElements);
    
    return selected;
}

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const getDaysDiffVerbose = (date) => {
    const dateMili = dateToMili(date);
    const dateNowMili = dateToMili(Date.now());
    const diffTime = Math.abs(dateNowMili - dateMili);
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (dateNowMili > dateMili) {
        diffDays = -diffDays;
    }
    return diffDays; 
}

export const getDaysDiff = (date) => {
    const dateMili = dateToMili(date);
    const dateNowMili = dateToMili(Date.now());
    const diffTime = Math.abs(dateNowMili - dateMili);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays; 
}

export const dateToMili = date => {
    const cdate = new Date(date);
    return cdate.getTime();
}
