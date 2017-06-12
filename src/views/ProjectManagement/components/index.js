import React, { Component } from 'react';
import { connect } from 'react-redux';
import SubNav from './SubNav';
import Summary from '../../../common/components/Summary';
import WorkflowContainer from './Workflow';
import FilterWrapper from './Workflow/FilterWrapper';
import { addSubject, addStage } from '../actions';
import StatusChange from './Modals/StatusChange';

class ProjectManagementContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { statusModalId: false,
        };
    }
    render() {
        const modalEntities = {
            projectstatuschange: 'project',
            surveystatuschnage: 'survey',
        };
        return (
                <div>
                    { this.state.statusModalId &&
                        <StatusChange vocab={this.props.vocab}
                            entity={modalEntities[this.state.statusModalId]}/> }
                    <SubNav />
                    <hr className='divider' />
                    <Summary
                        project={this.props.data.project.workflow}
                        survey={this.props.data.project.survey}
                        onStatusChangeClick={id => this.setState({ statusModalId: id })}
                        vocab={this.props.vocab} />
                    <hr className='divider' />
                    <FilterWrapper />
                    <div><WorkflowContainer {...this.props} /></div>
                </div>
        );
    }
}

ProjectManagementContainer.displayName = 'Project Manager';

const mapStateToProps = state => ({
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
    onCancel: () => this.setState({ statusModalId: false }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectManagementContainer);
