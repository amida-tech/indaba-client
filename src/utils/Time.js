import * as moment from 'moment';

export default {
    validateTime(time) {
        return moment(time, 'MM/DD/YYYY', true).isValid();
    },
    renderForProjectList(time) {
        return moment(time).format('DD MMM Y');
    },
    renderForMessageList(time) {
        return moment(time).format('DD MMM Y');
    },
    renderForTaskReview(time) {
        return moment(time).format('MM/DD/YYYY');
    },
    renderForInboxMessageList(time) {
        return moment(time).format('DD MMM Y h:mmA');
    },
    renderGeneralTimestamp(time) {
        return moment(time).format('MM/DD/YY hh:mmA');
    },
    renderForSurvey(time) {
        return moment(time, 'MM/DD/YYYY').format('YYYY-MM-DD');
    },
    renderEndDateForTaskList(time, vocab) {
        return moment(time).calendar(null, {
            sameDay(now) {
                return (this.isBefore(now) ?
                    `[${vocab.TIME.OVERDUE}]` :
                    `[${vocab.TIME.DUE_TODAY}]`);
            },
            nextDay: `[${vocab.TIME.DUE_TOMORROW}]`,
            nextWeek: 'DD MMM Y',
            lastDay: `[${vocab.TIME.OVERDUE}]`,
            lastWeek: `[${vocab.TIME.OVERDUE}]`,
            sameElse(now) {
                return (this.isBefore(now) ?
                `[${vocab.TIME.OVERDUE}]` :
                'DD MMM Y');
            },
        });
    },
    isInPast(time) {
        return moment().isAfter(time);
    },
    isToday(time) {
        return moment(time).isBetween(
            moment().startOf('day'),
            moment().endOf('day'),
        );
    },
    isTomorrow(time) {
        return moment(time).isBetween(
            moment().endOf('day'),
            moment().endOf('day').add(1, 'day'),
        );
    },
    isThisWeek(time) {
        return moment(time).isBetween(
            moment().startOf('week'),
            moment().endOf('week'),
        );
    },
};
