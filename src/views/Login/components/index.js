import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators, compose } from 'redux';
import { withRouter } from 'react-router';
import { submit } from 'redux-form';

import * as actions from '../actions';
import LoginPanel from './LoginPanel';

class LoginContainer extends Component {
    render() {
        return (
            <LoginPanel
                {...this.props} />
        );
    }
}

LoginContainer.propTypes = {
    vocab: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        vocab: state.settings.language.vocabulary,
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, actions), dispatch),
    onClickToSubmit: () => dispatch(submit('task-options-form')),
});

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(LoginContainer);
