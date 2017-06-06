import React, { Component } from 'react';
import Modal from '../../../../common/Modal';
import { TextInput } from 'grommet';

class NewProjectTitle extends Component {
    render() {
        return <Modal
            title='Project Title'
            class='new-project-title-layer'
            content={
                <div>
                    <TextInput placeholder='Title'/>
                    <div className='new-project-title-layer-description-container'>
                        <textarea className='new-project-title-layer-description'/>
                    </div>
                </div>
            }
            data={this.props.data}/>;
    }
}

export default NewProjectTitle;
