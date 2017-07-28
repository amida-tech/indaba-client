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
