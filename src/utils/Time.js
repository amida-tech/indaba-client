import * as moment from 'moment';

export default {
    renderForProjectList(time) {
        return moment(time).format('DD MMMM Y');
    },
    renderForMessageList(time) {
        return moment(time).format('h:mmA');
    },
};
