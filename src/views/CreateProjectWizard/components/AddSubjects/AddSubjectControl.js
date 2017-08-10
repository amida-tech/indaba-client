import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, reduxForm, submit, reset } from 'redux-form';
import IonIcon from 'react-ionicons';

class AddSubjectControl extends Component {
    render() {
        return (
            <form className='add-subject-control' onSubmit={this.props.handleSubmit}>
                <div className='add-subject-control__header'>
                    <div>{this.props.vocab.PROJECT.ADD_SUBJECT_CLARIFICATION}</div>
                    <div>{this.props.vocab.COMMON.ACTIONS}</div>
                </div>
                <div className='add-subject-control__fields'>
                    <Field name='subjects'
                        component='input'
                        type='text'/>
                    <div className='add-subject-control__plus-icon'
                        onClick={this.props.onPlusClick}>
                        <IonIcon icon='ion-ios-plus'/>
                    </div>
                </div>
            </form>
        );
    }
}

AddSubjectControl.propTypes = {
    projectId: PropTypes.number.isRequired,
    vocab: PropTypes.object.isRequired,
    createSubject: PropTypes.func.isRequired,
};

const FORM_NAME = 'add-subject-control';

export default connect(null, dispatch => ({
    onPlusClick: () => dispatch(submit(FORM_NAME)),
}))(reduxForm({
    form: FORM_NAME,
    onSubmit: (values, dispatch, ownProps) => {
        // const splitSubjects = values.subjects.split(/\s*,\s*/)
        //     .filter(subject => subject !== ''); //TODO Bring back.
        ownProps.createSubject(
            ownProps.projectId,
            {
                name: values.subjects,
                unitOfAnalysisType: 1,
            },
            ownProps.vocab.ERROR,
            ownProps.addSubjectsToWizard,
        );
    },
    onSubmitSuccess: (result, dispatch) => dispatch(reset(FORM_NAME)),
})(AddSubjectControl));
