import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Stamp from '../../../common/components/Dashboard/Stamp';

class UserGlance extends Component {
    render() {
        return (
            <div className='user-glance'>
                <Stamp label={this.props.vocab.PROJECT.TASKS}
                    value={this.props.tasks} />
                <Stamp label={this.props.vocab.PROJECT.NEW_TASK}
                    value={this.props.newTask} />
                <Stamp label={this.props.vocab.PROJECT.LATE_TASK}
                    value={this.props.lateTask} />
                <Stamp label={this.props.vocab.PROJECT.FLAGGED}
                    value={this.props.flagged} />
            </div>
        );
    }
}

UserGlance.propTypes = {
    vocab: PropTypes.object.isRequired,
    tasks: PropTypes.number.isRequired,
    newTask: PropTypes.number.isRequired,
    lateTask: PropTypes.number.isRequired,
    flagged: PropTypes.number.isRequired,
};

export default UserGlance;
