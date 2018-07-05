import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import { has, get } from 'lodash';
import { toast } from 'react-toastify';

import apiService from '../../../services/api';
import ActivateForm from './ActivateForm';

const ServerErrorsToVocabError = {
    401: 'INVALID_TOKEN',
    400: 'PASSWORD_REQUIRED',
    500: 'SERVER_ISSUE',
};

class Activate extends Component {
    render() {
        return (
            <div className='activate'>
                <div className='activate__instructions'>
                    <span className='activate__statement'>
                        {this.props.vocab.USER.ACTIVATE_INSTRUCTIONS}
                    </span>
                    <span className='activate__statement'>
                        {this.props.vocab.USER.PASSWORD_INSTRUCTIONS}
                    </span>
                </div>
                <ActivateForm
                    vocab={this.props.vocab}
                    onSubmit={
                        values => apiService.users.activate(
                            values,
                            this.props.params.realm,
                            this.props.params.token)
                        .then(() => {
                            toast(this.props.vocab.TOAST.ACTIVATION_SUCCESS,
                                { onClose: this.props.redirectToLogin });
                        })
                        .catch((err) => {
                            if (has(ServerErrorsToVocabError, get(err.response, 'status'))) {
                                toast(
                                    this.props.vocab.ERROR[
                                        ServerErrorsToVocabError[err.response.status]
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
    params: PropTypes.shape({
        realm: PropTypes.string.isRequired,
        token: PropTypes.string.isRequired,
    }).isRequired,
    vocab: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    vocab: state.settings.language.vocabulary,
});

const mapDispatchToProps = dispatch => ({
    redirectToLogin: () => dispatch(push('/login')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Activate);
