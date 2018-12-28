import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { renderName } from '../../../../../utils/User';

class SubjectPopupContents extends Component {
    render() {
        const stages = this.props.tasks
            .filter(task => task.userId === this.props.user.id
                && task.subject === this.props.subjects.indexOf(this.props.subject))
            .map(task => this.props.stages.find(stage => stage.id === task.stage));
        return (
            <div className='subject-popup-contents'>
                <div className='subject-popup-contents__subject'>{this.props.subject}</div>
                {stages.map(stage => <div key={stage.id}
                    className='subject-popup-contents__stage-entry'>
                    <div className='subject-popup-contents__stage-title'>
                        {stage.title}
                    </div>
                    <div className='subject-popup-contents__user-name'>
                        {renderName(this.props.user)}
                    </div>
                </div>)
                }
            </div>
        );
    }
}

SubjectPopupContents.propTypes = {
    stages: PropTypes.arrayOf(PropTypes.object).isRequired,
    tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
    subject: PropTypes.string.isRequired,
    subjects: PropTypes.arrayOf(PropTypes.string).isRequired,
    user: PropTypes.object.isRequired,
};

export default SubjectPopupContents;
