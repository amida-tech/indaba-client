import React, { Component } from 'react';
import { Field } from 'redux-form';
import { find, has } from 'lodash';

import { renderName } from '../../../utils/User';

class ReviewPane extends Component {
    render() {
        return (
            <div className='review-pane'>
                {has(this.props, 'answer.commentHistory') &&
                    <div className='review-pane__display'>
                        {this.props.answer.commentHistory.map((comment, index) =>
                            <div className='review-pane__comment'
                                key={`review-pane-comment${index}`}>
                                <div className='review-pane__comment-reason'>
                                    {this.props.vocab.COMMON[comment.reason.toUpperCase()]}
                                </div>
                                <div className='review-pane__comment-text'>
                                    {comment.text}
                                </div>
                                <div className='review-pane__comment-signature'>
                                    –{renderName(this.props.profile.id === comment.userId ?
                                        this.props.profile :
                                        find(this.props.users, user => user.id === comment.userId))}
                                </div>
                            </div>,
                        )}
                    </div> }
                <div className='review-pane__controls'>
                    <label className='review-pane__radio-controls'>
                        <Field
                            name={`answers[${this.props.questionIndex}].comment.reason`}
                            component='input'
                            type='radio'
                            onClick={this.props.handleSubmit}
                            disabled={this.props.displayMode}
                            value='agree' />
                        <span>{this.props.vocab.COMMON_BUTTONS.AGREE}</span>
                    </label>
                    <label className='review-pane__radio-controls'>
                        <Field
                            name={`answers[${this.props.questionIndex}].comment.reason`}
                            component='input'
                            type='radio'
                            onClick={this.props.handleSubmit}
                            disabled={this.props.displayMode}
                            value='disagree' />
                        <span>{this.props.vocab.COMMON_BUTTONS.DISAGREE}</span>
                    </label>
                </div>
                <Field className='review-pane__text'
                    name={`answers[${this.props.questionIndex}].comment.text`}
                    component='textarea'
                    onBlur={this.props.handleSubmit}
                    disabled={this.props.displayMode}
                    placeholder={this.props.vocab.COMMON_BUTTONS.COMMENT_TIP} />
            </div>
        );
    }
}

export default ReviewPane;
