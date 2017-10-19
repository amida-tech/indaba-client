import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MessagesMain extends Component {
    render() {
        return (
            <div className='messages-main'>
                <div className='messages-main__title'>
                    {this.props.vocab.MESSAGES.MESSAGES}
                </div>
            </div>
        );
    }
}

MessagesMain.propTypes = {
    vocab: PropTypes.object.isRequired,
};

export default MessagesMain;
