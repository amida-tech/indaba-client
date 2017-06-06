import React, { Component } from 'react';
import { TextInput } from 'grommet';
import Modal from '../../../../common/Modal';

class NewProjectTitle extends Component {
    render() {
        return <Modal
            title='Project Title'
            class='new-project-title-layer'
            data={this.props.data}>
            <div>
                <TextInput placeholder='Title'/>
                <div className='new-project-title-layer-description-container'>
                    <textarea className='new-project-title-layer-description'/>
                </div>
            </div>
        </Modal>;
    }
}

export default NewProjectTitle;
