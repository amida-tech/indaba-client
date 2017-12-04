import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { cloneDeep } from 'lodash';
import PropTypes from 'prop-types';

import * as actions from '../actions';
import AddQuestionPanel from './AddQuestionPanel';
import CreateSurveyPanel from './CreateSurveyPanel';

class SurveyBuilder extends Component {
    render() {
        const options = this.props.form.sections ?
            this.props.form.sections.map((section, index) =>
                ({ value: index,
                    label: (section.name ||
                    this.props.vocab.SURVEY.SECTION_ + (index + 1)) })) : [];
        const allOptions = cloneDeep(options);
        allOptions.unshift({ value: -1, label: this.props.vocab.SURVEY.VIEW_ALL });
        return (
            <div className='survey-builder'>
                <AddQuestionPanel className='survey-builder__add-question'
                    sectionView={this.props.ui.sectionView}
                    actions={this.props.actions}
                    vocab={this.props.vocab}
                    options={options} />
                <CreateSurveyPanel className='survey-builder__create-survey'
                    ui={this.props.ui}
                    form={this.props.form}
                    actions={this.props.actions}
                    vocab={this.props.vocab}
                    options={allOptions} />
                </div>
        );
    }
}

SurveyBuilder.propTypes = {
    project: PropTypes.object.isRequired,
    survey: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    actions: PropTypes.object,
    vocab: PropTypes.object.isRequired,
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
