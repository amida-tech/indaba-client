import React, { Component } from 'react';
import { connect } from 'react-redux';
import SubNav from './SubNav';
import Summary from '../../../common/components/Summary';
import WorkflowContainer from './Workflow';
import ModalContent from './Modals';
import FilterWrapper from './Workflow/FilterWrapper';
import { addSubject, addStage, closeModal, showModal } from '../actions';

class ProjectManagementContainer extends Component {
    render() {
        const modal = this.props.modal ?
        <ModalContent
            id={this.props.modal} {...this.props} /> :
            null;
        return (
                <div>
                    {modal}
                    <SubNav />
                    <hr className='divider' />
                    <Summary
                        project={this.props.data.project.workflow}
                        survey={this.props.data.project.survey}
                        onStatusChangeClick={this.props.onStatusChangeClick}
                        vocab={this.props.vocab} />
                    <hr className='divider' />
                    <FilterWrapper />
                    <div><WorkflowContainer {...this.props} /></div>
                </div>
        );
    }
}

ProjectManagementContainer.displayName = 'Project Manager';

const mapStateToProps = (state, ownProps) => ({
    data: state,
    vocab: state.settings.language.vocabulary,
    modal: state.project.navigation.modal,
});

const mapDispatchToProps = dispatch => ({
    onAddSubject: (subject) => {
        dispatch(addSubject(subject));
    },
    onAddStage: (stage) => {
        dispatch(addStage(stage));
    },
    onStatusChangeClick: (id) => {
        dispatch(showModal(id));
    },
    onCancel: () => dispatch(closeModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectManagementContainer);
