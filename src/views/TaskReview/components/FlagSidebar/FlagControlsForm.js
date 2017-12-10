import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, form, reduxForm, reset } from 'redux-form';

import { renderName } from '../../../../utils/User';
import FlagUserSelect from './FlagUserSelect';

class FlagControlsForm extends Component {
    render() {
        const userOptions = this.props.users ?
            this.props.users.map(user => ({
                label: renderName(user),
                value: user,
            })) : [];
        return (
            <form className='flag-controls-form'
                onSubmit={this.props.handleSubmit}>
                <Field className='flag-controls-form__discussion'
                    name='entry'
                    component='textarea'
                    placeholder={this.props.vocab.PROJECT.REPLY} />
                <div className='flag-controls-form__mark-resolve-section'>
                    <Field name='isResolved'
                        component='input'
                        type='checkbox' />
                    {this.props.vocab.PROJECT.MARK_RESOLVED}
                </div>
                <div className='flag-controls-form__notify-section'>
                    {this.props.vocab.PROJECT.NOTIFY_USER}
                    <Field className='flag-controls-form__notify'
                        name='notify'
                        component={FlagUserSelect}
                        userOptions={userOptions} />
                </div>
                <div className='flag-controls-form__button-group'>
                    <button className='flag-controls-form__button-cancel'
                        type='button'
                        onClick={this.props.reset}>
                        {this.props.vocab.COMMON.CANCEL}
                    </button>
                    <button className='flag-controls-form__button-send'
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
    vocab: PropTypes.object.isRequired,
};

const FORM_NAME = 'flag-controls-form';

export default reduxForm({
    form: FORM_NAME,
    enableReinitialize: true,
    onSubmit: (values, dispatch, ownProps) => {
        ownProps.actions.postDiscussion(
            values,
            ownProps.vocab.ERROR,
        );
    },
    onSubmitSuccess: (result, dispatch) => dispatch(reset(FORM_NAME)),
})(FlagControlsForm);
