import React, { Component } from 'react';
import { connect } from 'react-redux';

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

export default connect(mapStateToProps)(MessagesContainer);
