import React, { Component } from 'react';
import { Button } from 'grommet';
import Modal from '../../../../common/Modal';

class CreateNewProject extends Component {
    render() {
        const vocab = this.props.vocab.MODAL.CREATE_NEW_PROJECT_MODAL;
        const body = (
            <div>
                <div>
                    <Button label={vocab.CREATE_NEW_PROJECT} primary={true}/>
                    <p>{vocab.CREATE_INSTRUCTION}</p>
                </div>
                <hr className='divider'/>
                <div>
                    <Button label={vocab.IMPORT_PROJECT}/>
                    <p>{vocab.IMPORT_INSTRUCTION}</p>
                </div>
            </div>
        );
        return (
            <Modal
              class='create-new-project-layer'
              content={body}
              data={this.props.data}/>
        );
    }
}

export default CreateNewProject;
