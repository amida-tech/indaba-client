import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import { assignTask } from '../../../actions';

import { renderName } from '../../../../../utils/User';

/* Take in props for name, function for whatever edit will be,
   state of completion and the date the task is due. Based on
   the last two factors, decide whether to flag as late, not
   started. in progress or done.
*/

const Types = {
    ASSIGNEECARD: 'AssigneeCard',
};

const cardSource = {
    canDrag(props) {
        return true;
    },
    isDragging(props, monitor) {
        return monitor.getItem().id === props.children.id;
    },
    beginDrag(props, monitor, component) {
        return { id: props.children.id };
    },
    endDrag(props, monitor, component) {
        if (!monitor.didDrop()) {
            return;
        }

        const dropResult = monitor.getDropResult();
        const assignment = {
            id: props.children.id,
            name: renderName(props.children),
            role: props.children.role,
            stage: dropResult.task.stage,
            subject: dropResult.task.subject,
        };
        props.assignTask(assignment);
    },
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    };
}

class AssigneeCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { id } = this.props.children;
        const { isDragging, connectDragSource } = this.props;

        return connectDragSource(
            <div className='assignee-card'>
                { renderName(this.props.children) }
                { isDragging }
            </div>,
        );
    }
}

export default DragSource(Types.ASSIGNEECARD, cardSource, collect)(AssigneeCard);
