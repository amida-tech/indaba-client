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
    dueDateInPast(task, stages) {
        const dueDate = task.dueDate ||
            stages.find(stage => stage.id === task.stage).endDate;
        return Date.parse(dueDate) < Date.now();
    },
    daysUntilDue(task, stages) {
        const day = 24 * 60 * 60 * 1000;
        const dueDate = task.dueDate ||
            stages.find(stage => stage.id === task.stage).endDate;
        return Math.round((new Date(dueDate).getTime()
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
        return (userGroups.map(group => group.name).toString().replace(/,/, ', '));
    },
};
