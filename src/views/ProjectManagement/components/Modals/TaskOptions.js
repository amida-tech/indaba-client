import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormField, RadioButton, Select } from 'grommet';
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
        console.log(event);
        this.props.calls.updateTaskOptionsReassignId(event.target.value);
    }

    updateNotify(event){
        console.log(event);
        this.props.calls.updateTaskOptionsNotify(event.target.value);
    }

    updateMessage(event){
        console.log(event);
        this.props.calls.updateTaskOptionsMessage(event.target.value);
    }

    isValid() {
        return true;
    }

    render() {
        console.log(this.props);
        const userOptions = this.props.users.map(user => (user.id === this.props.task.userId ?
            {value: user.id, label: this.props.users[user.id].name + this.props.vocab._CURRENTLY_ASSIGNED } :
            {value: user.id, label: this.props.users[user.id].name}
        ));

        console.log(userOptions);
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
                    <Select
                        options={userOptions}
                        onChange={this.updateReassignId} />
                        <RadioButton id='skip'
                            name='taskOptions'
                            label={this.props.vocab.SKIP}
                            value='skip'
                            onChange={this.updateChoice} />
                    <div className='task-options__skip-explain'>
                        {this.props.vocab.SKIP_PARAGRAPH}
                    </div>
                    <hr className='divider'/>
                </div>
            </Modal>

        );
    }
}

TaskOptions.propTypes = {
    projectId: PropTypes.number.isRequired,
    users: PropTypes.array.isRequired,
    task: PropTypes.object.isRequired,
    vocab: PropTypes.object.isRequired,
    calls: PropTypes.object.isRequired,
};

export default TaskOptions;
