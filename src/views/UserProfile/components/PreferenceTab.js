import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import { constants } from '../../../common/reducers/userReducer';

class PreferenceTab extends Component {
    render() {
        return (
            <div className='preference-tab'>
                <label className='preference-tab__label'>
                    {this.props.vocab.USER.NOTIFY_LEVEL}
                    <Field className='preference-tab__input-select'
                        component='select'
                        name='notifyLevel'
                        normalize={value => parseInt(value, 0)}>
                        <option className='preference-tab__input-option'
                            value={constants.notifications.OFF}>
                            {this.props.vocab.USER.NOTIFY_OFF}
                        </option>
                        <option className='preference-tab__input-option'
                            value={constants.notifications.INTERNAL}>
                            {this.props.vocab.USER.NOTIFY_INTERNAL}
                        </option>
                        <option className='preference-tab__input-option'
                            value={constants.notifications.EMAIL}>
                            {this.props.vocab.USER.NOTIFY_EMAIL}
                        </option>
                    </Field>
                </label>
                <label className='preference-tab__label'>
                    {this.props.vocab.USER.STATUS}
                    <Field className='preference-tab__input-select'
                        component='select'
                        name='isActive'
                        normalize={value => value === constants.status.ACTIVE}
                        format={value => (value ?
                            constants.status.ACTIVE :
                            constants.status.INACTIVE)}>
                        <option className='preference-tab__input-option'
                            value={constants.status.ACTIVE}>
                            {this.props.vocab.USER.ACTIVE}
                        </option>
                        <option className='preference-tab__input-option'
                            value={constants.status.INACTIVE}>
                            {this.props.vocab.USER.INACTIVE}
                        </option>
                    </Field>
                </label>
                <label className='preference-tab__label'>
                    {this.props.vocab.USER.NOTES}
                    <Field className='preference-tab__input-textarea'
                        component='textarea'
                        name='notes' />
                </label>
            </div>
        );
    }
}

PreferenceTab.propTypes = {
    vocab: PropTypes.object.isRequired,
};

export default PreferenceTab;
