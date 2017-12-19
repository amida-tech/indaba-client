import React, { Component } from 'react';
import { Field } from 'redux-form';

class ReviewPane extends Component {
    render() {
        console.log('review pane');
        console.log(this.props.fields.length);
        return (
            <div className='review-pane'>
                <div className='review-pane__controls'>
                    <label className='review-pane__radio-controls'>
                        <Field
                            name={`answers[${this.props.questionIndex}].comments`}
                            component='input'
                            type='radio'
                            onClick={() => this.props.fields.push({ reason: 'agree' })}
                            disabled={this.props.displayMode}
                            value='agree' />
                        <span>{this.props.vocab.COMMON_BUTTONS.AGREE}</span>
                    </label>
                    <label className='review-pane__radio-controls'>
                        <Field
                            name='reason'
                            component='input'
                            type='radio'
                            onClick={() => this.props.fields.push()}
                            disabled={this.props.displayMode}
                            value='disagree' />
                        <span>{this.props.vocab.COMMON_BUTTONS.DISAGREE}</span>
                    </label>
                </div>
                <Field className='review-pane__comment'
                    name='text'
                    component='textarea'
                    onBlur={() => this.props.fields.push()}
                    disabled={this.props.displayMode}
                    placeholder={this.props.vocab.COMMON_BUTTONS.COMMENT_TIP} />
            </div>
        );
    }
}

export default ReviewPane;
