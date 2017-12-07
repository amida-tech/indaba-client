import React, { Component } from 'react';

class ReviewPane extends Component {

    render() {
        console.log(this.props);
        return (
            <div className='review-pane'>
                <div className='review-pane__controls'>
                    <label className='review-pane__radio-controls'>
                        <input type='radio'
                            id='review-agree'
                            checked={true}
                            name='review-assessment'
                            value={true}
                            onChange={() => console.log('Coming soon.')} />
                        <span>{this.props.vocab.COMMON_BUTTONS.AGREE}</span>
                    </label>
                    <label className='review-pane__radio-controls'>
                        <input type='radio'
                            id='review-disagree'
                            checked={false}
                            name='review-assessment'
                            value={false}
                            onChange={() => console.log('Coming soon.')} />
                        <span>{this.props.vocab.COMMON_BUTTONS.DISAGREE}</span>
                    </label> <br />
                    <textarea type='text'
                        className='review-pane__comment'
                        id='review-comment'
                        disabled={true}
                        placeholder={this.props.comment ||
                            this.props.vocab.COMMON_BUTTONS.COMMENT_TIP} />
                </div>
            </div>
        );
    }
}

export default ReviewPane;
