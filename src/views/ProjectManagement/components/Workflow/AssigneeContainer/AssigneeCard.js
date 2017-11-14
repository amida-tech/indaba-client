import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

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
    canDrag() { // Possible arg: props
        return true;
    },
    isDragging(props, monitor) {
        return monitor.getItem().id === props.children.id;
    },
    beginDrag(props) { // Possible arg: monitor, component
        return { id: props.children.id };
    },
    endDrag(props, monitor) { // Possible arg: component
        if (!monitor.didDrop()) {
            return;
        }
        const slot = monitor.getDropResult();
        props.actions.assignTask(props.children.id, slot,
            props.project, props.vocab.ERROR);
    },
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    };
}

class AssigneeCard extends Component {

    render() {
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
