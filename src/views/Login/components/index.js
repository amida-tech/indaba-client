import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import * as actions from '../actions';
import LoginForm from './LoginForm';

class LoginContainer extends Component {
    render() {
        return (
            <LoginForm
                vocab={this.props.vocab} />
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
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
