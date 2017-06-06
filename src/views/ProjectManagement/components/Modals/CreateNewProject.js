import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button } from 'grommet';
import Modal from '../../../../common/Modal';
import { showModal } from '../../actions';
import { modalIDs } from '../Modals';

class CreateNewProject extends Component {
    render() {
        const vocab = this.props.vocab.MODAL.CREATE_NEW_PROJECT_MODAL;
        return (
            <Modal
                class='create-new-project-layer'>
                <div>
                    <div>
                        <Link
                            to={{ pathname: '/create-new-project',
                                state: { showTitleModal: true } }}>
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

const mapStateToProps = () => ({});
const mapDispathToProps = dispatch => ({
    onCreateNewProjectClick: () => dispatch(showModal(modalIDs.NEW_PROJECT_TITLE)),
});

export default connect(mapStateToProps, mapDispathToProps)(CreateNewProject);
