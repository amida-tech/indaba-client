import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import IonIcon from 'react-ionicons';
import { push } from 'react-router-redux';

import * as actions from '../../actions';

import Message from './Message';

class MessageContainer extends Component {
    componentWillMount() {
        this.props.actions.discardReply();
        this.props.actions.listMessages();
        this.props.actions.listArchivedMessages();
    }
    render() {
        return (
            <div className='message-container'>
                <div className='message-container__back'>
                    <Link to='/messages' className='message-container__back-link'>
                        <IonIcon icon='ion-chevron-left'
                            className='message-container__back-icon' />
                        {this.props.vocab.MESSAGES.BACK_TO_INBOX}
                    </Link>
                </div>
                {
                    this.props.thread.map(message =>
                    <Message {...this.props}
                        key={message.id}
                        id={message.id}
                        message={message} />,
                    )
                }
                {
                    this.props.ui.reply &&
                    <Message vocab={this.props.vocab} profile={this.props.profile}
                        reply={this.props.ui.reply}
                        actions={this.props.actions}
                        users={this.props.users} />
                }
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.params.id !== undefined ?
        parseInt(ownProps.params.id, 10) :
        undefined;
    const message = state.messages.messages
        .find(messageIter => messageIter.id === id);
    const thread = message ?
        state.messages.messages.filter(messageIter =>
            messageIter.originalMessageId === message.originalMessageId) :
        [];
    return {
        id,
        message,
        thread,

        vocab: state.settings.language.vocabulary,
        profile: state.user.profile,
        ui: state.messages.ui,
        users: state.user.users,
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, actions), dispatch),
    goToMessage: id => dispatch(push(`/messages/${id}`)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageContainer);
