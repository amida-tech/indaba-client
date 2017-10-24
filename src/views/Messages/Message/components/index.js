import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions';

import Message from './Message';

class MessageContainer extends Component {
    render() {
        return (
            <div className='message-container'>
                <Message {...this.props}/>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    id: ownProps.params.id && parseInt(ownProps.params.id, 10),
    vocab: state.settings.language.vocabulary,
    message: state.messages.messages.find(message => message.id ===
        parseInt(ownProps.params.id, 10)),
    me: `${state.user.profile.firstName} ${state.user.profile.lastName}`,
});
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, actions), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageContainer);
