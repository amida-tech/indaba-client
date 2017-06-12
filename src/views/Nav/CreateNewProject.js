import React, { Component } from 'react';
import { Button } from 'grommet';
import Modal from '../../common/Modal';

class CreateNewProject extends Component {
    render() {
        const vocab = this.props.vocab.MODAL.CREATE_NEW_PROJECT_MODAL;
        return (
            <Modal
                class='create-new-project-layer'>
                <div>
                    <div>
                        <Button path='/create-new-project'
                            onClick={this.props.onCancel}
                            primary
                            label={vocab.CREATE_NEW_PROJECT} />
                        <p>{vocab.CREATE_INSTRUCTION}</p>
                    </div>
                    <hr className='divider'/>
                    <div>
                        <Button label={vocab.IMPORT_PROJECT}/>
                        <p>{vocab.IMPORT_INSTRUCTION}</p>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default CreateNewProject;
