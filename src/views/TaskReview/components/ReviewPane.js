import React, { Component } from 'react';
import { Field } from 'redux-form';

class ReviewPane extends Component {
    render() {
        console.log('review pane');
        console.log(this.props);
        return (
            <div className='review-pane'>
                <div className='review-pane__controls'>
                    <label className='review-pane__radio-controls'>
                        <Field
                            name={`answers[${this.props.questionIndex}].reason`}
                            component='input'
                            type='radio'
                            disabled={this.props.displayMode}
                            value='agree' />
                        <span>{this.props.vocab.COMMON_BUTTONS.AGREE}</span>
                    </label>
                    <label className='review-pane__radio-controls'>
                        <Field
                            name={`answers[${this.props.questionIndex}].reason`}
                            component='input'
                            type='radio'
                            disabled={this.props.displayMode}
                            value='disagree' />
                        <span>{this.props.vocab.COMMON_BUTTONS.DISAGREE}</span>
                    </label>
                </div>
                <Field className='review-pane__comment'
                    name={`answers[${this.props.questionIndex}].text`}
                    component='textarea'
                    disabled={this.props.displayMode}
                    placeholder={this.props.vocab.COMMON_BUTTONS.COMMENT_TIP} />
            </div>
        );
    }
}

export default ReviewPane;
