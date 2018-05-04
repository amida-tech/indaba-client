import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import { has, get } from 'lodash';
import { toast } from 'react-toastify';

import apiService from '../../../services/api';
import ActivateForm from './ActivateForm';

const ServerErrorsToVocabError = {
    'Token is not valid': 'INVALID_TOKEN',
    'Password field is required!': 'PASSWORD_REQUIRED',
};

class Activate extends Component {
    render() {
        return (
            <div className='activate'>
                <div className='activate__instructions'>
                    {this.props.vocab.USER.ACTIVATE_INSTRUCTIONS}
                </div>
                <ActivateForm
                    vocab={this.props.vocab}
                    onSubmit={
                        values => apiService.users.activate(
                            values,
                            this.props.match.params.realm,
                            this.props.match.params.token)
                        .then(() => {
                            toast(this.props.vocab.TOAST.ACTIVATION_SUCCESS,
                                { onClose: this.props.redirectToLogin });
                        })
                        .catch((err) => {
                            if (has(ServerErrorsToVocabError, get(err, 'body.message'))) {
                                toast(
                                    this.props.vocab.ERROR[
                                        ServerErrorsToVocabError[err.body.message]
                                    ],
                                    { type: 'error', autoClose: false });
                            } else {
                                toast(this.props.vocab.ERROR.ACTIVATION_FAILURE,
                                    { type: 'error', autoClose: false });
                            }
                        })
                    }/>
            </div>
        );
    }
}

Activate.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            realm: PropTypes.string.isRequired,
            token: PropTypes.string.isRequired,
        }).isRequired,
    }),
    vocab: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    vocab: state.settings.language.vocabulary,
});

const mapDispatchToProps = dispatch => ({
    redirectToLogin: () => dispatch(push('/login')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Activate);
