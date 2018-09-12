import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Field, form, reduxForm, reset,
} from 'redux-form';
import { toast } from 'react-toastify';

import FlagUserSelect from './FlagUserSelect';

class FlagControlsForm extends Component {
    render() {
        return (
            <form className='flag-controls-form'
                onSubmit={this.props.handleSubmit}>
                <Field className='flag-controls-form__discussion'
                    name='entry'
                    component='textarea'
                    disabled={this.props.disabled}
                    placeholder={this.props.vocab.PROJECT.REPLY} />
                <div className='flag-controls-form__mark-resolve-section'>
                    <Field name='isResolve'
                        component='input'
                        disabled={this.props.disabled}
                        type='checkbox' />
                    <div className='flag-controls-form__resolve-text'>
                        {this.props.vocab.PROJECT.MARK_RESOLVED}
                    </div>
                </div>
                <div className='flag-controls-form__notify-section'>
                    {this.props.vocab.PROJECT.NOTIFY_USER}
                    <Field className='flag-controls-form__notify'
                        name='userId'
                        component={FlagUserSelect}
                        disabled={this.props.disabled}
                        userOptions={this.props.userOptions} />
                </div>
                <div className='flag-controls-form__button-group'>
                    <button className='flag-controls-form__button-cancel'
                        type='button'
                        disabled={this.props.disabled}
                        onClick={this.props.reset}>
                        {this.props.vocab.COMMON.CANCEL}
                    </button>
                    <button className='flag-controls-form__button-send'
                        disabled={this.props.disabled}
                        type='submit'>
                        {this.props.vocab.COMMON.SEND}
                    </button>
                </div>
            </form>
        );
    }
}

FlagControlsForm.propTypes = {
    actions: PropTypes.objectOf(PropTypes.func).isRequired,
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    task: PropTypes.object.isRequired,
    ui: PropTypes.shape({
        flags: PropTypes.array,
        flagSideBar: PropTypes.object,
    }).isRequired,
    userOptions: PropTypes.arrayOf(PropTypes.object),
    vocab: PropTypes.object.isRequired,
};

const FORM_NAME = 'flag-controls-form';

export default reduxForm({
    form: FORM_NAME,
    enableReinitialize: true,
    onSubmit: (values, dispatch, ownProps) => {
        if (!values.userId) {
            toast(ownProps.vocab.ERROR.REQUIRE_FLAG_USER);
        } else if (values.entry === '' || !values.entry) {
            toast(ownProps.vocab.ERROR.EMPTY_TEXT);
        } else {
            ownProps.actions.postDiscussion(
                values,
                ownProps.vocab.ERROR,
            );
            toast(values.isResolve ? ownProps.vocab.SURVEY.MARK_SENT
                : ownProps.vocab.SURVEY.FLAG_SENT);
        }
    },
    onSubmitSuccess: (result, dispatch) => dispatch(reset(FORM_NAME)),
})(FlagControlsForm);
