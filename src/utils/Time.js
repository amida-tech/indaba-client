import * as moment from 'moment';

export default {
    validateTime(time) {
        return moment(time, 'MM/DD/YYYY', true).isValid();
    },
    renderForProjectList(time) {
        return moment(time).format('DD MMM Y');
    },
    renderForMessageList(time) {
        if (this.isToday(time)) {
            return moment(time).format('h:mm A');
        }
        return moment(time).format('DD MMM Y');
    },
    renderForMessage(time, vocab, uppercase) {
        if (time === undefined) {
            return '';
        }
        if (this.isToday(time)) {
            return (`${vocab.TIME.TODAY} ${vocab.TIME.AT} ${moment(time).format(`h:mm ${uppercase ? 'A' : 'a'}`)}`);
        }
        return (`${moment(time).format('DD MMMM Y')} ${vocab.TIME.AT} ${moment(time).format(`h:mm ${uppercase ? 'A' : 'a'}`)}`);
    },
    renderForStageSummary(time) {
        return moment(time).format('M/D/YY');
    },
    renderForQuestion(time) {
        return moment(time).format('MM/DD/YYYY');
    },
    renderForTaskReview(time) {
        return moment(time).format('MMMM D, YYYY');
    },
    renderForInboxMessageList(time) {
        return moment(time).format('DD MMM Y, h:mm A');
    },
    renderFlagTimestamp(time, vocab) {
        if (this.isToday(time)) {
            return (`${vocab.TIME.TODAY} ${moment(time).format('h:mmA')}`);
        }
        return moment(time).format('M/D/YY h:mmA');
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
            nextWeek: 'MM.DD.YYYY',
            lastDay: `[${vocab.TIME.OVERDUE}]`,
            lastWeek: `[${vocab.TIME.OVERDUE}]`,
            sameElse(now) {
                return (this.isBefore(now) ?
                `[${vocab.TIME.OVERDUE}]` :
                'MM.DD.YYYY');
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
