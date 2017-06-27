import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RadioButton, CheckBox, TextInput, Select } from 'grommet';
import _ from 'lodash';
import Modal from '../../../../common/Modal';
import { renderName } from '../../../../utils/User';

class TaskOptions extends Component {
    componentWillMount() {
        this.props.calls.updateTaskOptionsMessage(this.props.vocab.NOTIFY_MESSAGE);
    }

    isValid() {
        return true;
    }

    render() {
        const currentUser = _.find(this.props.users, user =>
            user.id === this.props.taskOptions.task.userId);
        const userOptions = this.props.users.map(user =>
            (currentUser ?
            { value: user, label: renderName(user) + this.props.vocab._CURRENTLY_ASSIGNED } :
            { value: user, label: renderName(user) }
        ));
        return (
            <Modal
                title={this.props.vocab.TITLE}
                class='task-options-layer'
                onCancel={this.props.calls.closeTaskOptionsModal}
                isValid={this.isValid()}
                onSave={() => this.props.calls.setTaskOptions}>
                <div className='task-options'>
                    <RadioButton id='force'
                        name='taskOptions'
                        label={this.props.vocab.FORCE}
                        value='force'
                        onChange={event =>
                            this.props.calls.updateTaskOptionsChoice(event.target.value)} />
                    <div className='task-options__force-explain'>
                        {this.props.vocab.FORCE_PARAGRAPH}
                    </div>
                    <RadioButton id='reassign'
                        name='taskOptions'
                        label={this.props.vocab.REASSIGN}
                        value='reassign'
                        onChange={event =>
                            this.props.calls.updateTaskOptionsChoice(event.target.value)} />
                    <Select value={this.props.taskOptions.reassignUser ?
                        renderName(this.props.taskOptions.reassignUser) : ''}
                        placeHolder= {renderName(currentUser)
                            + this.props.vocab._CURRENTLY_ASSIGNED}
                        options={userOptions}
                        onChange={event =>
                            this.props.calls.updateTaskOptionsReassignUser(event.option.value)} />
                        <RadioButton id='skip'
                            disabled={true}
                            name='taskOptions'
                            label={this.props.vocab.SKIP}
                            value='skip'
                            onChange={event =>
                                this.props.calls.updateTaskOptionsChoice(event.target.value)} />
                    <div className='task-options__skip-explain'>
                        {this.props.vocab.SKIP_PARAGRAPH}
                    </div>
                    <hr className='task-options__divider'/>
                    <CheckBox
                        label={this.props.vocab.NOTIFY}
                        checked={this.props.taskOptions.notify}
                        onChange={event =>
                            this.props.calls.updateTaskOptionsNotify(event.target.checked)} />
                    <div className='task-options__notice'>
                        {renderName(currentUser) + this.props.vocab._WILL_BE_NOTIFIED}
                    </div>
                    <TextInput className='task-options__message'
                        value={this.props.taskOptions.message}
                        onDOMChange={event =>
                            this.props.calls.updateTaskOptionsMessage(event.target.value)} />
                </div>
            </Modal>
        );
    }
}

TaskOptions.propTypes = {
    projectId: PropTypes.number.isRequired,
    users: PropTypes.array.isRequired,
    taskOptions: PropTypes.object.isRequired,
    vocab: PropTypes.object.isRequired,
    calls: PropTypes.object.isRequired,
};

export default TaskOptions;
