import React, { Component } from 'react';

class AnswerPanel extends Component {

    render() {
        return (
            <div className='answer-panel'>
                {this.props.vocab.PROJECT.INSTRUCTIONS}
            </div>
        );
    }
}

export default AnswerPanel;
