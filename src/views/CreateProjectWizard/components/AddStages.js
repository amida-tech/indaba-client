import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box, Button } from 'grommet';
import Summary from '../../../common/components/Summary';
import AddStage from '../../ProjectManagement/components/Modals/AddStage';

class AddStages extends Component {
    constructor(props) {
        super(props);
        this.state = { addStageModal: false };
    }
    render() {
        return (<div className='add-stages-step'>
            {this.state.addStageModal && <AddStage />}
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

const mapStateToProps = state => ({
    vocab: state.settings.language.vocabulary,
    project: state.projectwizard.project,
    survey: state.projectwizard.survey,
});

export default connect(mapStateToProps)(AddStages);
