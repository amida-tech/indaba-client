import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import _ from 'lodash';

import * as actions from '../../actions';

import MessageField from './MessageField';
import MessageBodyField from './MessageBodyField';

class Message extends Component {
    componentWillMount() {
        // load message from backend
    }
    render() {
        const compose = this.props.params.id === undefined;
        return (
            <form className='message'>
                <Link to='/messages'>
                    {this.props.vocab.MESSAGES.BACK_TO_INBOX}
                </Link>
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
                <div className='message_row'>
                    <MessageField label={this.props.vocab.MESSAGES.SUBJECT}
                        input={compose}
                        value={_.get(this.props, 'message.subject')}
                        name='subject'/>
                </div>
                <div className='message__body-section'>
                    <MessageBodyField
                        input={compose}
                        value={_.get(this.props, 'message.message')}
                        name='message'/>
                    <div className='mesage__body-timestamp'>
                        {_.get(this.props, 'message.timestamp')}
                    </div>
                </div>
                <div className='message__inline-reply'>
                    {this.props.vocab.MESSAGES.WRITE_REPLY}
                </div>
            </form>
        );
    }
}

Message.propTypes = {
    vocab: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
    vocab: state.settings.language.vocabulary,
    message: state.messages.messages.find(message => message.id ===
        parseInt(ownProps.params.id, 10)),
    me: `${state.user.profile.firstName} ${state.user.profile.lastName}`,
});
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, actions), dispatch),
});

const MessageForm = reduxForm({ form: 'message' })(Message);

class MessageSelector extends Component {
    render() {
        return this.props.params.id !== undefined ?
            (<Message {...this.props}/>) :
            (<MessageForm {...this.props}/>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageSelector);
