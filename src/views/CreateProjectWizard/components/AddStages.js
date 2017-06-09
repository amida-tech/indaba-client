import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box, Button } from 'grommet';
import Summary from '../../../common/components/Summary';

class AddStages extends Component {
    render() {
        return (<div className='add-stages-step'>
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
            <p>{this.props.vocab.PROJECT.ADD_STAGES_CLARIFICATION}</p>
            <hr className='divider' />
        </div>);
    }
}

const mapStateToProps = state => ({
    vocab: state.settings.language.vocabulary,
    project: state.projectwizard.project,
    survey: state.projectwizard.survey,
});

export default connect(mapStateToProps)(AddStages);
