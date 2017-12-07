import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import IonIcon from 'react-ionicons';

import Questions from './Questions';

class ReviewPane extends Component {
    constructor(props) {
        super(props);
        this.handleClickReview = this.handleClickReview.bind(this);
    }

    handleClickReview(event) { // TODO: INBA-443
        this.setState({ review: event.target.value === 'true' });
    }

    render() {
        console.log(this.props);
        return (
            <Box className='review-pane'>
                {!this.props.taskView &&
                <button className='review-pane__flag-button'>
                    <IonIcon className='review-pane__flag-button--icon' icon='ion-ios-flag'/>
                </button>}
                <Questions
                    {...this.props.question}
                    assessmentId={this.props.assessmentId}
                    answers={this.props.answers}
                    displayMode={this.props.displayMode}
                    actions={this.props.actions}
                    vocab={this.props.vocab} />
                <div className='review-pane__controls'>
                    <label className='review-pane__controls--radio'>
                        <input type='radio'
                            id='review-agree'
                            checked={this.props.review}
                            name='review-assessment'
                            value={true}
                            onChange={this.handleClickReview} />
                        <span>{this.props.vocab.COMMON_BUTTONS.AGREE}</span>
                    </label>
                    <label className='review-pane__controls--radio'>
                        <input type='radio'
                            id='review-disagree'
                            checked={!this.props.review}
                            name='review-assessment'
                            value={false}
                            onChange={this.handleClickReview} />
                        <span>{this.props.vocab.COMMON_BUTTONS.DISAGREE}</span>
                    </label> <br />
                    <input type='text'
                        className='review-pane__controls--comment'
                        id='review-comment'
                        disabled={this.props.review}
                        placeholder={this.props.comment ||
                            this.props.vocab.COMMON_BUTTONS.COMMENT_TIP} />
                </div>
            </Box>
        );
    }
}

export default ReviewPane;
