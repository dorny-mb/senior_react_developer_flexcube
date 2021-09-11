export const calcTimestamp = (value = 0) => value * 1000;
export const getDay = (value = 0) => new Date(calcTimestamp(value)).getDay();
