import React, { Component } from 'react';
import { Button } from 'grommet';
import Modal from '../../../../common/Modal';

class AddSubject extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    render() {
        const vocab = this.props.vocab;
        return (
            <Modal
                title={vocab.PROJECT.ADD_SUBJECT}
                class='add-subject-layer'
                onCancel={this.props.onCancel}
                onSave={() => this.props.onAddSubject(this.state.value)}>
                <input
                    type='text'
                    placeholder={vocab.PROJECT.SUBJECT_TITLE}
                    onChange={this.handleChange}/>
            </Modal>
        );
    }
}

export default AddSubject;
