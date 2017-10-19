import React, { Component } from 'react';
import { connect } from 'react-redux';

import MessagesMain from './MessagesMain';

class MessagesContainer extends Component {
    render() {
        return (
            <MessagesMain {...this.props} />
        );
    }
}

const mapStateToProps = state => ({
    vocab: state.settings.language.vocabulary,
});

export default connect(mapStateToProps)(MessagesContainer);
