import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Box, Button } from 'grommet';
import Summary from '../../../common/components/Summary';
import AddStageModal from '../../ProjectManagement/components/Modals/AddStage';
import { addStageToWizard } from '../actions';
import StageSummary from '../../ProjectManagement/components/Workflow/StageSummary';

class AddStages extends Component {
    constructor(props) {
        super(props);
        this.state = { addStageModal: false };
    }
    render() {
        return (<div className='add-stages-step'>
            {this.state.addStageModal && <AddStageModal
                vocab={this.props.vocab}
                userGroups={this.props.groups}
                onCancel={() => this.setState({ addStageModal: false })}
                onAddStage={(stage) => {
                    this.setState({ addStageModal: false });
                    this.props.onAddStage(stage);
                }}/>}
            <Summary
                project={this.props.project}
                survey={this.props.survey}
                vocab={this.props.vocab} />
            <hr className='divider'/>
            <Box direction='row' justify='end'
                pad={{ vertical: 'small', horizontal: 'medium' }}>
                <Button label={this.props.vocab.PROJECT.IMPORT_STAGE} />
            </Box>
            <hr className='divider' />
            <p className='wizard-clarification'>
                {this.props.vocab.PROJECT.ADD_STAGES_CLARIFICATION}
            </p>
            <hr className='divider' />
            <Box direction='row'>
                {this.props.project.stages.map((stage) => {
                    return <StageSummary stage={stage} vocab={this.props.vocab}
                        userGroups={this.props.groups}
                        key={stage.id}/>;
                })}
                <div className='add-stage-placeholder'
                    onClick={() => this.setState({ addStageModal: true })}>
                    <div className='workflow-stage-title'>
                        {this.props.vocab.PROJECT.STAGE_TITLE}
                    </div>
                    <div className='workflow-stage-summary'>
                        {this.props.vocab.PROJECT.SELECT_TO_EDIT_STAGE}
                    </div>
                </div>
            </Box>
        </div>);
    }
}

AddStages.propTypes = {
    project: PropTypes.object.isRequired,
    survey: PropTypes.object.isRequired,
    vocab: PropTypes.object.isRequired,
    groups: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
    vocab: state.settings.language.vocabulary,
    project: state.projectwizard.project,
    survey: state.projectwizard.survey,
    groups: state.projectwizard.project.userGroups,
});

const mapDispatchToProps = dispatch => ({
    onAddStage: stage => dispatch(addStageToWizard(stage)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddStages);
