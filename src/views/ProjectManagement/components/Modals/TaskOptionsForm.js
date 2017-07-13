import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RadioButton, CheckBox, Select } from 'grommet';
import _ from 'lodash';
import { renderName } from '../../../../utils/User';

class TaskOptionsForm extends Component {
    componentWillMount() {
        this.props.actions.updateTaskOptionsMessage(this.props.vocab.NOTIFY_MESSAGE);
    }

    render() {
        const currentUser = _.find(this.props.users, user =>
            user.id === this.props.taskOptions.task.userId);
        const userOptions = this.props.users.map(user => (
            user === currentUser ?
            { value: user, label: renderName(user) + this.props.vocab._CURRENTLY_ASSIGNED } :
            { value: user, label: renderName(user) }
        ));
        return (
                <div className='task-options__body'>
                    <RadioButton id='force'
                        name='taskOptions'
                        label={this.props.vocab.FORCE}
                        className='task-options__header'
                        value='force'
                        onChange={event =>
                            this.props.actions.updateTaskOptionsChoice(event.target.value)} />
                    <div className='task-options__header-paragraph'>
                        {this.props.vocab.FORCE_PARAGRAPH}
                    </div>
                    <RadioButton id='reassign'
                        name='taskOptions'
                        label={this.props.vocab.REASSIGN}
                        className='task-options__header'
                        value='reassign'
                        onChange={event =>
                            this.props.actions.updateTaskOptionsChoice(event.target.value)} />
                    <Select value={this.props.taskOptions.reassignUser ?
                        renderName(this.props.taskOptions.reassignUser) : ''}
                        placeHolder= {renderName(currentUser)
                            + this.props.vocab._CURRENTLY_ASSIGNED}
                        options={userOptions}
                        className='task-options__header-text-box'
                        onChange={event =>
                            this.props.actions.updateTaskOptionsReassignUser(event.option.value)} />
                        <RadioButton id='skip'
                            disabled={true}
                            name='taskOptions'
                            label={this.props.vocab.SKIP}
                            className='task-options__header'
                            value='skip'
                            onChange={event =>
                                this.props.actions.updateTaskOptionsChoice(event.target.value)} />
                    <div className='task-options__header-paragraph'>
                        {this.props.vocab.SKIP_PARAGRAPH}
                    </div>
                    <hr className='task-options__divider'/>
                    <CheckBox
                        className='task-options__header'
                        label={this.props.vocab.NOTIFY}
                        checked={this.props.taskOptions.notify}
                        onChange={event =>
                            this.props.actions.updateTaskOptionsNotify(event.target.checked)} />
                    <div className='task-options__notify-user-warning'>
                        {renderName(currentUser) + this.props.vocab._WILL_BE_NOTIFIED}
                    </div>
                    <textarea className={'task-options__header-text-box' +
                            ' task-options__notify-user-warning-text-box'}
                        value={this.props.taskOptions.message}
                        onChange={event =>
                            this.props.actions.updateTaskOptionsMessage(event.target.value)} />
                </div>
        );
    }
}

TaskOptionsForm.propTypes = {
    vocab: PropTypes.object.isRequired,
    projectId: PropTypes.number.isRequired,
    users: PropTypes.array.isRequired,
    taskOptions: PropTypes.object.isRequired,
    actions: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default TaskOptionsForm;
