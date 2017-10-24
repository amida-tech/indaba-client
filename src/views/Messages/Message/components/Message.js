import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import IonIcon from 'react-ionicons';
import _ from 'lodash';

import MessageField from './MessageField';
import MessageBodyField from './MessageBodyField';
import ButtonPanel, { PanelButton } from '../../components/ButtonPanel';

class Message extends Component {
    componentWillMount() {
        // load message from backend
    }
    render() {
        const compose = this.props.id === undefined;
        return (
            <div className='message'>
                <div className='message__back'>
                    <Link to='/messages' className='message__back-link'>
                        <IonIcon icon='ion-chevron-left' className='message__back-icon' />
                        {this.props.vocab.MESSAGES.BACK_TO_INBOX}
                    </Link>
                </div>
                <form className='message__content'>
                    <div className='message__row message__row--top'>
                        <MessageField label={this.props.vocab.MESSAGES.TO}
                            input={compose}
                            value={this.props.me}
                            name='to'/>
                        <div className='message__timestamp'>
                            {this.props.message && this.props.message.timestamp}
                        </div>
                    </div>
                    <div className='message__row'>
                        <MessageField label={this.props.vocab.MESSAGES.FROM}
                            input={compose}
                            value={_.get(this.props, 'message.from')}
                            name='from'/>
                    </div>
                    <div className='message__row'>
                        <MessageField label={this.props.vocab.MESSAGES.SUBJECT}
                            input={compose}
                            value={_.get(this.props, 'message.subject')}
                            name='subject'/>
                    </div>
                    <div className='message__body-section'>
                        {
                            !compose &&
                            <div className='message__body-actions'>
                                <ButtonPanel>
                                    <PanelButton>
                                        <IonIcon icon='ion-ios-trash-outline'
                                            className='message__action-icon'/>
                                    </PanelButton>
                                    <PanelButton title={this.props.vocab.MESSAGES.ARCHIVE}
                                        onClick={
                                            (event) => {
                                                this.props.actions
                                                .archiveMessage(this.props.message.id);
                                                event.stopPropagation();
                                            }
                                        }>
                                        <IonIcon icon='ion-ios-box'
                                            className='message__action-icon'/>
                                    </PanelButton>
                                    <PanelButton
                                        title={this.props.vocab.MESSAGES.MARK_AS_UNREAD}
                                        onClick={
                                            (event) => {
                                                this.props.actions
                                                .markMessageAsUnread(this.props.message.id);
                                                event.stopPropagation();
                                            }
                                        }>
                                        <IonIcon icon='ion-email-unread'
                                            className='message__action-icon'/>
                                    </PanelButton>
                                    <PanelButton>
                                        <IonIcon icon='ion-arrow-right-a'
                                            className='message__action-icon'/>
                                    </PanelButton>
                                    <PanelButton
                                        onClick={ this.props.actions.startReply }>
                                        <IonIcon icon='ion-reply'
                                            className='message__action-icon'/>
                                    </PanelButton>
                                </ButtonPanel>
                            </div>
                        }
                        <div className='message__body-field-wrapper'>
                            <MessageBodyField
                                input={compose}
                                value={_.get(this.props, 'message.message')}
                                name='message'/>
                        </div>
                        <div className='message__body-timestamp'>
                            {_.get(this.props, 'message.timestamp')}
                        </div>
                    </div>
                </form>
                {
                    !compose &&
                    <div className='message__inline-reply'>
                        {this.props.vocab.MESSAGES.WRITE_REPLY}
                    </div>
                }
            </div>
        );
    }
}

Message.propTypes = {
    id: PropTypes.number,

    vocab: PropTypes.object.isRequired,
};

const MessageForm = reduxForm({ form: 'message' })(Message);

class MessageSelector extends Component {
    render() {
        return this.props.id !== undefined ?
            (<Message {...this.props}/>) :
            (<MessageForm {...this.props}/>);
    }
}

export default MessageSelector;
