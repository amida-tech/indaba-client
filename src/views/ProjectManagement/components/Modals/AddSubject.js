import React, { Component } from 'react';
import { Button } from 'grommet';
import Modal from '../../../../common/Modal';

class AddSubject extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.handleChange = this.handleChange.bind(this);
        this.isValid = this.isValid.bind(this);
    }
    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    isValid(){
        return (this.state.value.length > 0);
    }
    render() {
        return (
            <Modal
                title={this.props.vocab.PROJECT.ADD_SUBJECT}
                class='add-subject-layer'
                onCancel={this.props.onCancel}
                isValid={this.isValid()}
                onSave={() => this.props.onAddSubject(this.state.value)}>
                <input
                    type='text'
                    placeholder={this.props.vocab.PROJECT.SUBJECT_TITLE}
                    onChange={this.handleChange}/>
            </Modal>
        );
    }
}

export default AddSubject;
