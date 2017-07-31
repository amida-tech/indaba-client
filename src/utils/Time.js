import * as moment from 'moment';

export default {
    renderForProjectList(time) {
        return moment(time).format('DD MMM Y');
    },
    renderForMessageList(time) {
        return moment().calendar(time, {
            sameDay: 'h:mmA',
            lastDay: 'M.D.YYYY',
            lastWeek: 'M.D.YYYY',
            sameElse: 'M.D.YYYY',
        });
    },
    renderDueDateForTaskList(time, vocab) {
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
