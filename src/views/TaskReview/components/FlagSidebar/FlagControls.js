import React, { Component } from 'react';
import { Box, CheckBox } from 'grommet';
import PropTypes from 'prop-types';
import Select from 'react-select';

import { renderName } from '../../../../utils/User';

class FlagControls extends Component {
    render() {
        return (
            <Box className='flag-controls'>
                <CheckBox className='flag-controls__checkbox'
                    checked={this.props.ui.flagSidebar.resolved}
                    onChange={event =>
                        this.props.actions.updateMarkResolved(event.target.checked)} />
                        <label className='flag-controls__checkbox-resolved'>
                        {this.props.vocab.PROJECT.MARK_RESOLVED}
                        </label>
                <div className='flag-controls__notify'>
                    {this.props.vocab.PROJECT.NOTIFY_USER}
                    <Select className='flag__controls__notify-selcet'
                        value={renderName(this.props.ui.flagSidebar.notifyUser)}
                        options={this.props.users.map(user => ({
                            label: renderName(user),
                            value: user,
                        }))}
                        onChange={event =>
                            this.props.actions.updateNotifyUser(event.option.value)} />
                </div>
                <div className='flag-controls__button-group'>
                    <button className='flag-controls__button-group-cancel'
                        onClick={this.props.actions.cancelFlaggedUpdate} >
                        {this.props.vocab.COMMON.CANCEL}
                    </button>
                    <button className='flag-controls__button-group-send'
                        onClick={() => this.props.actions.updateFlaggedQuestion(
                            this.props.task.id,
                            this.props.projectId,
                            this.props.ui.flagSidebar.activeId,
                            this.props.ui.flagSidebar)} >
                        {this.props.vocab.COMMON.SEND}
                    </button>
                </div>
            </Box>
        );
    }
}

FlagControls.propTypes = {
    actions: PropTypes.objectOf(PropTypes.func).isRequired,
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    task: PropTypes.object.isRequired,
    ui: PropTypes.shape({
        flags: PropTypes.array,
        flagSideBar: PropTypes.object,
    }).isRequired,
    vocab: PropTypes.object.isRequired,
};

export default FlagControls;
