import React, { Component } from 'react';
import { TextInput } from 'grommet';
import Modal from '../../../../common/Modal';

class NewProjectTitle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
        };
    }
    handleTitleChange(evt) {
        this.setState({ title: evt.target.value });
    }
    render() {
        return <Modal
            title='Project Title'
            class='new-project-title-layer'
            onSave={() => this.props.onSave(this.state.title)}>
            <div>
                <TextInput placeholder='Title' onDOMChange={this.handleTitleChange.bind(this)}/>
                <div className='new-project-title-layer-description-container'>
                    <textarea className='new-project-title-layer-description'/>
                </div>
            </div>
        </Modal>;
    }
}

export default NewProjectTitle;
