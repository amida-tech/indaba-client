export default {
  // methods to determine filter status
  responsesExist(assignee) {
    return !!assignee.response;
  },
  responsesComplete(assignee) {
      return assignee.response &&
        assignee.response.every((response) => !!response.value);
  },
  responsesFlagged(assignee) {
      return assignee.response &&
        assignee.response.some((response) => response.flag);
  },
  dueDateInPast(assignee, stages) {
    const dueDate = assignee.dueDate ||
      stages.find(stage => stage.id === assignee.stage).endStage;
    return Date.parse(dueDate) < Date.now();
  },
  daysUntilDue(assignee, stages) {
    const day = 24*60*60*1000;
    const dueDate = assignee.dueDate ||
      stages.find(stage => stage.id === assignee.stage).endStage;
    return Math.round((new Date(dueDate).getTime()
      - new Date().getTime())/day);
  }
};
