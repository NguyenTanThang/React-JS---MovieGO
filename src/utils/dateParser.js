import moment from 'moment';

export const parseDateMoment = (date) => {
    return moment(date).format('DD MMM YYYY');
}
