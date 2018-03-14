import moment from 'moment';

export default {
    validateTime(time) {
        return moment(time, 'MM/DD/YYYY', true).isValid();
    },
    renderCommon(time) {
        return moment(time).format('MMM DD Y');
    },
    renderForMessageList(time) {
        if (this.isToday(time)) {
            return moment(time).format('h:mm A');
        }
        return this.renderCommon(time);
    },
    renderForMessage(time, vocab) {
        if (time === undefined) {
            return '';
        }
        if (this.isToday(time)) {
            return (`${vocab.TIME.TODAY} ${vocab.TIME.AT} ${moment(time).format('h:mm A')}`);
        }
        return (`${moment(time).format('MMMM DD Y')} ${vocab.TIME.AT} ${moment(time).format('h:mm A')}`);
    },
    renderForQuestion(time) {
        return moment(time).format('MM/DD/YYYY');
    },
    renderForInboxMessageList(time) {
        return moment(time).format('MMM DD YYYY, h:mm A');
    },
    renderFlagTimestamp(time, vocab) {
        if (this.isToday(time)) {
            return (`${vocab.TIME.TODAY} ${moment(time).format('h:mmA')}`);
        }
        return moment(time).format('MMM DD Y h:mmA');
    },
    renderAutosave(time) {
        return moment(time).format('MMM DD Y hh:mm a');
    },
    renderForSurvey(time) {
        return moment(time, 'MM/DD/YYYY').format('YYYY-MM-DD');
    },
    renderForExport(time) {
        return moment(time).format('MM/DD/YYYY_hh:mm');
    },
    renderEndDateForTaskList(time, vocab) {
        return moment(time).calendar(null, {
            sameDay(now) {
                return (this.isBefore(now) ?
                    `[${vocab.TIME.OVERDUE}]` :
                    `[${vocab.TIME.DUE_TODAY}]`);
            },
            nextDay: `[${vocab.TIME.DUE_TOMORROW}]`,
            nextWeek: 'MMM DD Y',
            lastDay: `[${vocab.TIME.OVERDUE}]`,
            lastWeek: `[${vocab.TIME.OVERDUE}]`,
            sameElse(now) {
                return (this.isBefore(now) ?
                `[${vocab.TIME.OVERDUE}]` :
                'MMM DD Y');
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
