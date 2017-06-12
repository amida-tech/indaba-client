import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
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
                        <Link to='/create-new-project'>
                             {vocab.CREATE_NEW_PROJECT}
                        </Link>
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
