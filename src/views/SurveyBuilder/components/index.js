import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import * as actions from '../actions';
import AddQuestionPanel from './AddQuestionPanel';
import CreateSurveyPanel from './CreateSurveyPanel';

class SurveyBuilder extends Component {
    render() {
        return (
            <div className='survey-builder'>
                <AddQuestionPanel
                    sectionView={this.props.ui.sectionView}
                    actions={this.props.actions}
                    vocab={this.props.vocab}/>
                <CreateSurveyPanel
                    {...this.props}/>
                </div>
        );
    }
}

SurveyBuilder.propTypes = {
    project: PropTypes.object.isRequired,
    survey: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    vocab: PropTypes.object.isRequired,
    actions: PropTypes.object,
};

const mapStateToProps = (state) => {
    return {
        ui: state.surveybuilder.ui,
        form: state.surveybuilder.form,
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SurveyBuilder);
