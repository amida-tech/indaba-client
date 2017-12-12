import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Stamp, { StampType } from '../../../common/components/Dashboard/Stamp';

class UserGlance extends Component {
    render() {
        return (
            <div className='user-glance'>
                <div className='user-glance__group'>
                    <Stamp label={this.props.vocab.PROJECT.TASKS_TO_DO}
                        value={this.props.tasks} />
                    <Stamp label={this.props.vocab.PROJECT.NEW_TASK}
                        value={this.props.newTasks}
                        type={StampType.GOOD} />
                </div>
                <div className='user-glance__group'>
                    <Stamp label={this.props.vocab.PROJECT.LATE_TASK}
                        value={this.props.lateTasks}
                        type={StampType.BAD} />
                    <Stamp label={this.props.vocab.PROJECT.FLAGGED}
                        value={this.props.flagged} />
                </div>
            </div>
        );
    }
}

UserGlance.propTypes = {
    vocab: PropTypes.object.isRequired,
    tasks: PropTypes.number.isRequired,
    newTasks: PropTypes.number.isRequired,
    lateTasks: PropTypes.number.isRequired,
    flagged: PropTypes.number.isRequired,
};

export default UserGlance;
