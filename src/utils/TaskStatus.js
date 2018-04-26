const day = 24 * 60 * 60 * 1000;

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
        const dueIn = new Date(task.endDate).getTime() - new Date().getTime();
        const dueExact = (dueIn / day);
        return (dueExact > 0 && dueExact < 2) ? dueExact : Math.floor((dueIn) / day);
    },
    formatUserGroups(userGroups) {
        return (userGroups.map(group => group.title).toString().replace(/,/, ', '));
    },
};
