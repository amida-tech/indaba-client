import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
/* Take in props for name, function for whatever edit will be,
   state of completion and the date the task is due. Based on
   the last two factors, decide whether to flag as late, not
   started. in progress or done.
*/

@Dragsource(type, spec, collect)
class AssigneeCard extends Component {
  render() {
    return(
      <div>
        {this.props.name}
      </div>
    )
  }
}

export default AssigneeCard
