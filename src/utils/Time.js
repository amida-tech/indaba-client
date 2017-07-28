import * as moment from 'moment';

export default {
    renderForProjectList(time) {
        return moment(time).format('DD MMMM Y');
    },
    renderForMessageList(time) {
        return moment().calendar(time, {
            sameDay: 'h:mmA',
            lastDay: 'M.D.YYYY',
            lastWeek: 'M.D.YYYY',
            sameElse: 'M.D.YYYY',
        });
    },
};
