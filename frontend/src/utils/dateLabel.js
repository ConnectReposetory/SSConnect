const MONTHS = [
  'jan', 'feb', 'mar', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'
]

export function dateToDay(string) {
    const date = new Date(string.replace(/ /g,"T"));
    return String(date.getDate()).padStart(2, '0');
}

export function dateToMonth(string) {
    const date = new Date(string.replace(/ /g,"T"));
    const month = date.getMonth();

    return MONTHS[month]
}
