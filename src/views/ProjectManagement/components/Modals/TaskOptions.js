import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormField, RadioButton, CheckBox, TextInput, Select } from 'grommet';
import Modal from '../../../../common/Modal';

class TaskOptions extends Component {
    constructor(props) {
        super(props);
        this.updateChoice = this.updateChoice.bind(this);
        this.updateReassignId = this.updateReassignId.bind(this);
        this.updateNotify = this.updateNotify.bind(this);
        this.updateMessage = this.updateMessage.bind(this);
    }

    updateChoice(event) {
        this.props.calls.updateTaskOptionsChoice(event.target.value);
    }

    updateReassignId(event){
        this.props.calls.updateTaskOptionsReassignId(event.option.value);
    }

    updateNotify(event){
        this.props.calls.updateTaskOptionsNotify(event.target.value);
    }

    updateMessage(event){
        this.props.calls.updateTaskOptionsMessage(event.target.value);
    }

    isValid() {
        return true;
    }

    render() {
        const userOptions = this.props.users.map(user => (user.id === this.props.taskOptions.task.userId ?
            {value: user.id, label: this.props.users[user.id].name + this.props.vocab._CURRENTLY_ASSIGNED } :
            {value: user.id, label: this.props.users[user.id].name}
        ));
        const isReassigned = this.props.users[this.props.taskOptions.reassignId];
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
                        onChange={this.updateChoice} />
                    <div className='task-options__force-explain'>
                        {this.props.vocab.FORCE_PARAGRAPH}
                    </div>
                    <RadioButton id='reassign'
                        name='taskOptions'
                        label={this.props.vocab.REASSIGN}
                        value='reassign'
                        onChange={this.updateChoice} />
                    <Select value={isReassigned ? isReassigned.name : ''}
                        placeHolder={this.props.users[this.props.taskOptions.task.userId].name
                            + this.props.vocab._CURRENTLY_ASSIGNED}
                        options={userOptions}
                        onChange={this.updateReassignId} />
                        <RadioButton id='skip'
                            disabled={true}
                            name='taskOptions'
                            label={this.props.vocab.SKIP}
                            value='skip'
                            onChange={this.updateChoice} />
                    <div className='task-options__skip-explain'>
                        {this.props.vocab.SKIP_PARAGRAPH}
                    </div>
                    <hr className='task-options__divider'/>
                    <CheckBox
                        label={this.props.vocab.NOTIFY}
                        checked={false}
                        onChange={this.updateNotify} />
                    <div className='task-options__notice'>
                        {this.props.users[this.props.taskOptions.task.userId].name
                            + this.props.vocab._WILL_BE_NOTIFIED}
                    </div>
                    <TextInput className='task-options__message'
                        value={this.props.vocab.NOTIFY_MESSAGE}
                        onDOMChange={this.updateMessage}/>
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
