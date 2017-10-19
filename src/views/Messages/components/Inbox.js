import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Inbox extends Component {
    render() {
        return (
            <div className='inbox'>
                <div className='inbox__title'>
                    {this.props.vocab.MESSAGES.MESSAGES}
                </div>
                <div className='inbox__top-row'>
                </div>
            </div>
        );
    }
}

Inbox.propTypes = {
    vocab: PropTypes.object.isRequired,
};

export default Inbox;
