export default {
    responsesComplete(task, surveySize) {
        return task.response &&
            task.response.every(response => response.value !== undefined) &&
                task.response.length === surveySize;
    },
    endDateInPast(task) {
        return Date.parse(task.endDate) < Date.now();
    },
    daysUntilDue(task) {
        const day = 24 * 60 * 60 * 1000;
        const newDate = new Date(task.endDate).getTime();
        const currentTime = new Date().getTime();
        const updatedDate = newDate - currentTime;
        const newDateRounded = Math.floor((updatedDate) / day);
        const exactDiff = (updatedDate / day);
        const result = exactDiff > 0 && exactDiff < 2
            ? exactDiff
            : newDateRounded;
        return result;
    },
    formatUserGroups(userGroups) {
        return (userGroups.map(group => group.title).toString().replace(/,/, ', '));
    },
};
