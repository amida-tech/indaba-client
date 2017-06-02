export default {
  // methods to determine filter status
  responsesExist(assignee) {
    return !!assignee.response;
  },
  responsesComplete(assignee) {
    return assignee.response &&
      assignee.response.every((response) => !!response.value);
  },
  dueDateInPast(assignee, stages) {
    const dueDate = assignee.dueDate ||
      stages.find(stage => stage.id === assignee.stage).endStage;
    return Date.parse(dueDate) < Date.now();
  },
};
