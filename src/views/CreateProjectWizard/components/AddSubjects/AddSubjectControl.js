import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, reduxForm, submit, reset } from 'redux-form';
import IonIcon from 'react-ionicons';

class AddSubjectControl extends Component {
    render() {
        return (
            <div className='add-subject-control'>
                <form className='add-subject-control__form'
                    onSubmit={this.props.handleSubmit}>
                    <div className='add-subject-control__header'>
                        {this.props.vocab.PROJECT.ADD_SUBJECT_CLARIFICATION}
                    </div>
                    <div className='add-subject-control__fields'>
                        <Field name='subjects'
                            className='add-subject-control__input'
                            component='input'
                            type='text'/>
                        <div className=''
                            onClick={this.props.onPlusClick}>
                            <IonIcon icon='ion-ios-plus'
                                className='add-subject-control__plus-icon'/>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

AddSubjectControl.propTypes = {
    project: PropTypes.object.isRequired,
    vocab: PropTypes.object.isRequired,
    addSubject: PropTypes.func.isRequired,
};

const FORM_NAME = 'add-subject-control';

export default connect(null, dispatch => ({
    onPlusClick: () => dispatch(submit(FORM_NAME)),
}))(reduxForm({
    form: FORM_NAME,
    onSubmit: (values, dispatch, ownProps) => {
        ownProps.addSubject(
            ownProps.project,
            values.subjects.split(/\s*,\s*/).filter(subject =>
                subject).map((subject) => { return { name: subject }; }),
            ownProps.vocab.ERROR,
        );
    },
    onSubmitSuccess: (result, dispatch) => dispatch(reset(FORM_NAME)),
})(AddSubjectControl));
