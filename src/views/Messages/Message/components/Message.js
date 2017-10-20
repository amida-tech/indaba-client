import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import _ from 'lodash';

import * as actions from '../../actions';

import MessageField from './MessageField';

class Message extends Component {
    componentWillMount() {
        // load message from backend
    }
    render() {
        const compose = this.props.params.id === undefined;
        const message = (
            <form className='message'>
                <div className='message__row message__row--top'>
                    <MessageField label={this.props.vocab.MESSAGES.TO}
                        input={compose}
                        value={_.get(this.props, 'message.from')}
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
            </form>
        );

        if (this.props.params.id === undefined) {
            return reduxForm({ form: 'message' })(message);
        }
        return message;
    }
}

Message.propTypes = {
    vocab: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
    vocab: state.settings.language.vocabulary,
    message: state.messages.messages.find(message => message.id ===
        parseInt(ownProps.params.id, 10)),
});
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, actions), dispatch),
});


export default connect(mapStateToProps, mapDispatchToProps)(Message);
