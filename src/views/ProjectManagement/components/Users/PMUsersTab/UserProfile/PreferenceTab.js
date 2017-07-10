import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import { constants } from '../../../../../../common/reducers/userReducer';

class PreferenceTab extends Component {
    render() {
        return (
            <div className='preference-tab'>
                <label>
                    {this.props.vocab.USER.NOTIFY_LEVEL}
                    <Field component='select' name='notifications'>
                        <option value={constants.notifications.OFF}>
                            {this.props.vocab.USER.NOTIFY_OFF}
                        </option>
                        <option value={constants.notifications.INTERNAL}>
                            {this.props.vocab.USER.NOTIFY_INTERNAL}
                        </option>
                        <option value={constants.notifications.EMAIL}>
                            {this.props.vocab.USER.NOTIFY_EMAIL}
                        </option>
                    </Field>
                </label>
                <label>
                    {this.props.vocab.USER.STATUS}
                    <Field component='select' name='status'>
                        <option value={constants.status.ACTIVE}>
                            {this.props.vocab.USER.ACTIVE}
                        </option>
                        <option value={constants.status.INACTIVE}>
                            {this.props.vocab.USER.INACTIVE}
                        </option>
                    </Field>
                </label>
                <label>
                    {this.props.vocab.USER.NOTES}
                    <Field component='textarea' name='notes' />
                </label>
            </div>
        );
    }
}

PreferenceTab.propTypes = {
    vocab: PropTypes.object.isRequired,
};

export default PreferenceTab;
