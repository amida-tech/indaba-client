import React, { Component } from 'react';
import { Button } from 'grommet';
import Modal from '../../common/components/Modal';

class CreateNewProject extends Component {
    render() {
        return (
            <Modal class='create-new-project'
                onCancel={this.props.onCancel}>
                <div className='create-new-project__body'>
                    <div className='create-new-project__button-panel'>
                        <Button className='create-new-project__button-panel-create'
                            path='/create-new-project'
                            onClick={this.props.onCancel}
                            primary
                            label={this.props.vocab.MODAL.CREATE_PROJECT.NEW} />
                        <p>{this.props.vocab.MODAL.CREATE_PROJECT.CREATE_INSTRUCTION}</p>
                    </div>
                    <hr className='divider'/>
                    <div className='create-new-project__button-panel'>
                        <Button label={this.props.vocab.MODAL.CREATE_PROJECT.IMPORT}/>
                        <p>{this.props.vocab.MODAL.CREATE_PROJECT.IMPORT_INSTRUCTION}</p>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default CreateNewProject;
