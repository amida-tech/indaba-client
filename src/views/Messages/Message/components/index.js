import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import IonIcon from 'react-ionicons';
import { push } from 'react-router-redux';
import { get } from 'lodash';

import * as actions from '../../actions';

import Message from './Message';

class MessageContainer extends Component {
    componentWillMount() {
        this.props.actions.discardReply();
        if (this.props.id) {
            this.props.actions.getThreadContainingMessage(this.props.id);
            this.props.actions.expandMessages([this.props.id]);
        }
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
                    (() => {
                        if (this.props.id !== undefined) {
                            const elements = this.props.thread.map(message =>
                                <Message {...this.props}
                                    key={message.id}
                                    id={message.id}
                                    message={message} />,
                            );

                            const insertAfterId = get(this.props, 'ui.reply.id',
                                get(this.props, 'ui.reply.forwardId'));
                            if (this.props.ui.reply) {
                                elements.splice(
                                    this.props.thread.findIndex(messageIter =>
                                        messageIter.id === insertAfterId) + 1,
                                        0,
                                        <Message key='reply'
                                            vocab={this.props.vocab}
                                            profile={this.props.profile}
                                            reply={this.props.ui.reply}
                                            actions={this.props.actions}
                                            users={this.props.users}
                                            ui={this.props.ui}
                                            goToMessage={this.props.goToMessage}/>);
                            }
                            return elements;
                        }
                        return <Message {...this.props} />;
                    })()
                }
            </div>
        );
    }
}

const mapStateToProps = (store, ownProps) => {
    const id = ownProps.params.id !== undefined ?
        parseInt(ownProps.params.id, 10) :
        undefined;
    return {
        id,
        thread: store.messages.thread,
        vocab: store.settings.language.vocabulary,
        profile: store.user.profile,
        ui: store.messages.ui,
        users: store.user.users,
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, actions), dispatch),
    goToMessage: (id) => {
        dispatch(actions.markAsRead(id));
        dispatch(push(`/messages/${id}`));
    },
    goToInbox: () => dispatch(push('/messages')),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageContainer);
