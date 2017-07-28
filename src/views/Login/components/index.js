import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { submit } from 'redux-form';

import * as actions from '../actions';
import config from '../../../config';
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

const mapStateToProps = (state, ownProps) => {
    return {
        realm: ownProps.params.realm || config.REALM || 'testorg',
        vocab: state.settings.language.vocabulary,
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, actions), dispatch),
    onClickToSubmit: () => dispatch(submit('task-options-form')),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
