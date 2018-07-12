import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../common/components/Modal';

class CreateNewProject extends Component {
    constructor(props) {
        super(props);
        this.handleCreateNew = this.handleCreateNew.bind(this);
    }

    handleCreateNew() {
        this.props.showCreateProject(false);
        this.props.goToNewProject();
    }

    render() {
        return (
            <Modal class='create-new-project'
                onCancel={this.props.onCancel}>
                <div className='create-new-project__body'>
                    <div className='create-new-project__button-panel'>
                        <button className='create-new-project__create-button'
                            onClick={this.handleCreateNew}>
                            <span>{this.props.vocab.MODAL.CREATE_PROJECT.NEW}</span>
                        </button>
                        <p>{this.props.vocab.MODAL.CREATE_PROJECT.CREATE_INSTRUCTION}</p>
                    </div>
                    <hr className='divider'/>
                    <div className='create-new-project__button-panel'>
                        <button className='create-new-project__import-button' disabled>
                            <span>{this.props.vocab.MODAL.CREATE_PROJECT.IMPORT}</span>
                        </button>
                        <p>{this.props.vocab.MODAL.CREATE_PROJECT.IMPORT_INSTRUCTION}</p>
                    </div>
                </div>
            </Modal>
        );
    }
}

CreateNewProject.propTypes = {
    vocab: PropTypes.object.isRequired,
    showCreateProject: PropTypes.func.isRequired,
    goToNewProject: PropTypes.func.isRequired,
};

export default CreateNewProject;
