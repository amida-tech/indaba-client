import React, { Component } from 'react';
import { Box, CheckBox, Button, Select } from 'grommet';
import PropTypes from 'prop-types';

class FlagControls extends Component {
    render() {
        return (
            <Box className='flag-controls'>
                <CheckBox className='flag-controls__checkbox'
                    label={this.props.vocab.PROJECT.MARK_RESOLVED}
                    checked={this.props.ui.flagSidebar.resolved}
                    onChange={event =>
                        this.props.actions.updateMarkResolved(event.target.checked)} />
                <div className='flag-controls__notify'>
                    {this.props.vocab.PROJECT.NOTIFY_USER}
                    <Select
                        value={this.props.ui.flagSidebar.notifyUser.name}
                        options={this.props.users.map(user => ({
                            label: user.name,
                            value: user,
                        }))}
                        onChange={event =>
                            this.props.actions.updateNotifyUser(event.option.value)} />
                </div>
                <div className='flag-controls__button-group'>
                    <Button className='flag-controls__button-group-cancel'
                        primary={false}
                        label={this.props.vocab.COMMON.CANCEL}
                        onClick={this.props.actions.cancelFlaggedUpdate} />
                    <Button className='flag-controls__button-group-send'
                        primary={true}
                        label={this.props.vocab.COMMON.SEND}
                        onClick={() => this.props.tasksActions.updateFlaggedQuestion(
                            this.props.task.id,
                            this.props.projectId,
                            this.props.ui.flagSidebar)} />
                </div>
            </Box>
        );
    }
}

FlagControls.propTypes = {
    actions: PropTypes.object.isRequired,
    tasksActions: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired,
    task: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
    vocab: PropTypes.object.isRequired,
};

export default FlagControls;
