import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import IonIcon from 'react-ionicons';

import * as actions from '../../actions';

import Message from './Message';

class MessageContainer extends Component {
    componentWillMount() {
        this.props.actions.discardReply();
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
                <Message {...this.props}/>
                {
                    this.props.ui.reply &&
                    <Message vocab={this.props.vocab} profile={this.props.profile}
                        reply={this.props.ui.reply}
                        actions={this.props.actions}/>
                }
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    id: ownProps.params.id && parseInt(ownProps.params.id, 10),
    vocab: state.settings.language.vocabulary,
    message: state.messages.messages.find(message => message.id ===
        parseInt(ownProps.params.id, 10)),
    profile: state.user.profile,
    ui: state.messages.ui,
    users: state.user.users,
});
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, actions), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageContainer);
