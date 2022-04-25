import moment from 'moment'
export default function isDateWithinTimeframe(date, timeframe) {
  const today = moment();

  switch(timeframe){
    case 'this_month':
      const month = moment().add(31, 'days');
      return moment(date).isBetween(today, month, undefined, []);
    case 'this_week':
      const week = moment().add(7, 'days')
      console.log(week) //eslint-disable-line
      return moment(date).isBetween(today, week, undefined, []);
    case 'today':
      return moment(today).isSame(date);
    default:
      return moment(date).isSameOrAfter(today);
  }
}
