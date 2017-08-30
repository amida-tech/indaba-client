export default {
// methods to determine filter status
    responsesExist(task) {
        return task.response &&
            task.response.some(response => response.value !== undefined);
    },
    responsesComplete(task, surveySize) {
        return task.response &&
            task.response.every(response => response.value !== undefined) &&
                task.response.length === surveySize;
    },
    responsesFlagged(task) {
        return task.response &&
            task.response.some(response => response.flag);
    },
    endDateInPast(task) {
        return Date.parse(task.endDate) < Date.now();
    },
    daysUntilDue(task) {
        const day = 24 * 60 * 60 * 1000;
        return Math.round((new Date(task.endDate).getTime()
            - new Date().getTime()) / day);
    },
    formatDate(date) {
        const formDate = new Date(date);
        return (`${formDate.getMonth() + 1}/${formDate.getDate()
             }/${formDate.getFullYear()}`);
    },
    formatDateTime(dateTime) {
        const formDate = new Date(dateTime);
        return (`${formDate.getMonth() + 1}/${formDate.getDate()
             }/${formDate.getFullYear()} ${formDate.getHours()}:${
             formDate.getMinutes()}${formDate.getHours() > 12 ? 'pm' : 'am'}`);
    },
    formatUserGroups(userGroups) {
        return (userGroups.map(group => group.title).toString().replace(/,/, ', '));
    },
};
