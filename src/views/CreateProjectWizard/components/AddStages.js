import React, { Component } from 'react';
import { connect } from 'react-redux';
import Summary from '../../../common/components/Summary';

class AddStages extends Component {
    render() {
        return (<div className='add-stages-step'>
            <Summary
                project={this.props.project}
                survey={this.props.survey}
                vocab={this.props.vocab} />
            <hr className='divider'/>
        </div>);
    }
}

const mapStateToProps = state => ({
    vocab: state.settings.language.vocabulary,
    project: state.projectwizard.project,
    survey: state.projectwizard.survey,
});

export default connect(mapStateToProps)(AddStages);
