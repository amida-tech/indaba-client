import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, form, reduxForm } from 'redux-form';

import TaskOptionsRadio from './TaskOptionsRadio';
import TaskOptionsSelect from './TaskOptionsSelect';
import TaskOptionsCheckbox from './TaskOptionsCheckbox';
import { renderName } from '../../../../../utils/User';

class TaskOptionsForm extends Component {
    render() {
        const disabled = this.props.task.status === 'completed';
        console.log(this.props.userOptions);
        return (
            <div className={`task-options-form__container${disabled ? ' task-options-form__container--disabled' : ''}`}>
                <form className='task-options-form'
                    onSubmit={this.props.handleSubmit}>
                    <Field
                        name='choice'
                        component={TaskOptionsRadio}
                        type='radio'
                        value='force'
                        label={this.props.vocab.PROJECT.OPTIONS_MODAL.FORCE}
                        disabled={disabled}
                    />

                    <div className='task-options-form__header-paragraph'>
                        {this.props.vocab.PROJECT.OPTIONS_MODAL.FORCE_PARAGRAPH}
                    </div>
                    <Field
                        name='choice'
                        component={TaskOptionsRadio}
                        type='radio'
                        value='unassign'
                        label={this.props.vocab.PROJECT.OPTIONS_MODAL.UNASSIGN}
                        disabled={disabled}
                    />
                    <div className='task-options-form__header-paragraph'>
                        {this.props.vocab.PROJECT.OPTIONS_MODAL.UNASSIGN_PARAGRAPH}
                    </div>
                    <Field
                        name='choice'
                        component={TaskOptionsRadio}
                        type='radio'
                        value='reassign'
                        label={this.props.vocab.PROJECT.OPTIONS_MODAL.REASSIGN}
                        disabled={disabled}
                    />
                    <Field
                        name='reassignUser'
                        component={TaskOptionsSelect}
                        type='select'
                        currentUser={this.props.currentUser}
                        userOptions={this.props.userOptions}
                        disabled={disabled}
                    />
                    <hr className='task-options-form__divider' />
                    <Field
                        name='notify'
                        component={TaskOptionsCheckbox}
                        type='checkbox'
                        value='false'
                        label={this.props.vocab.PROJECT.OPTIONS_MODAL.NOTIFY}
                        disabled={disabled}
                    />
                    <div className='task-options__notify-user-warning'>
                        {renderName(this.props.currentUser)
                            + this.props.vocab.PROJECT.OPTIONS_MODAL._WILL_BE_NOTIFIED}
                    </div>
                    <Field
                        name='message'
                        className={'task-options-form__header-text-box'
                            + ' task-options-form__notify-user-warning-text-box'}
                        component='textarea'
                        disabled={disabled}
                    />
                </form>
            </div>
        );
    }
}
TaskOptionsForm.propTypes = {
    vocab: PropTypes.object.isRequired,
    projectId: PropTypes.number.isRequired,
    users: PropTypes.array.isRequired,
};

export default reduxForm({ form: 'task-options-form' })(TaskOptionsForm);
