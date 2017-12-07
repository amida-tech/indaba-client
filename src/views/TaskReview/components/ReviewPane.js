import React, { Component } from 'react';
import { toast } from 'react-toastify';

class ReviewPane extends Component {

    render() {
        return (
            <div className='review-pane'>
                <div className='review-pane__controls'>
                    <label className='review-pane__radio-controls'>
                        <input type='radio'
                            id='review-agree'
                            checked={true}
                            name='review-assessment'
                            disabled={this.props.displayMode}
                            value={true}
                            onChange={() => toast('Coming soon.')} />
                        <span>{this.props.vocab.COMMON_BUTTONS.AGREE}</span>
                    </label>
                    <label className='review-pane__radio-controls'>
                        <input type='radio'
                            id='review-disagree'
                            checked={false}
                            name='review-assessment'
                            disabled={this.props.displayMode}
                            value={false}
                            onChange={() => toast('Coming soon.')} />
                        <span>{this.props.vocab.COMMON_BUTTONS.DISAGREE}</span>
                    </label>
                </div>
                <textarea type='text'
                    className='review-pane__comment'
                    id='review-comment'
                    disabled={this.props.displayMode}
                    placeholder={this.props.comment ||
                        this.props.vocab.COMMON_BUTTONS.COMMENT_TIP} />
            </div>
        );
    }
}

export default ReviewPane;
