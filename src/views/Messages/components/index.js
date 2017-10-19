import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import * as actions from '../actions';
import Inbox from './Inbox';

class MessagesContainer extends Component {
    render() {
        return (
            <Inbox {...this.props} />
        );
    }
}

const mapStateToProps = state => ({
    vocab: state.settings.language.vocabulary,
    messages: state.messages,
});
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, actions), dispatch),
    goToMessage: id => dispatch(push(`/messages/${id}`)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessagesContainer);
