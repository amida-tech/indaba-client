import * as moment from 'moment';

export default {
    renderForProjectList(time) {
        return moment(time).format('DD MMMM Y');
    },
    renderForMessageList(time) {
        return moment(time).format('h:mmA');
    },
    renderDueDateForTaskList(time, vocab) {
        return moment().calendar(time, {
            sameDay(now) {
                return (this.isBefore(now) ?
                    `[${vocab.TIME.OVERDUE}]` :
                    `[${vocab.TIME.DUE_TODAY}]`);
            },
            nextDay: vocab.TIME.DUE_TOMORROW,
            nextWeek: 'M.D.YYYY',
            lastDay: `[${vocab.TIME.OVERDUE}]`,
            lastWeek: `[${vocab.TIME.OVERDUE}]`,
            sameElse(now) {
                return (this.isBefore(now) ?
                `[${vocab.TIME.OVERDUE}]` :
                'M.D.YYYY');
            },
        });
    },
    isToday(time) {
        return moment(time).isAfter(moment().startOf('day')) &&
            moment(time).isBefore(moment().endOf('day'));
    },
    isTomorrow(time) {
        return moment(time).isAfter(moment().endOf('day')) &&
            moment(time).isBefore(moment().endOf('day').add(1, 'day'));
    },
};
