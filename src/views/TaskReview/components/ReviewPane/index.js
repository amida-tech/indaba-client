import React, { Component } from 'react';
import { connect } from 'react-redux';
import Box from 'grommet/components/Box';
import IonIcon from 'react-ionicons';

import Questions from '../../../../common/components/Questions';

class ReviewPane extends Component {
    constructor(props) {
        super(props);
        this.handleClickReview = this.handleClickReview.bind(this);
    }

    handleClickReview(event) { // TODO: INBA-443
        this.setState({ review: event.target.value === 'true' });
    }

    render() {
        const Question = Questions[this.props.type];
        return (
            <Box className='review-pane'>
                {!this.props.taskView &&
                <button className='review-pane__flag-button'>
                    <IonIcon className='review-pane__flag-button--icon' icon='ion-ios-flag'/>
                </button>}
                <Question {...this.props}/>
                <div className='review-pane__controls'>
                    <label className='review-pane__controls--radio'>
                        <input type='radio'
                            id='review-agree'
                            checked={this.props.review}
                            name='review-assessment'
                            value={true}
                            onChange={this.handleClickReview} />
                        <span>{this.props.vocab.AGREE}</span>
                    </label>
                    <label className='review-pane__controls--radio'>
                        <input type='radio'
                            id='review-disagree'
                            checked={!this.props.review}
                            name='review-assessment'
                            value={false}
                            onChange={this.handleClickReview} />
                        <span>{this.props.vocab.DISAGREE}</span>
                    </label> <br />
                    <input type='text'
                        className='review-pane__controls--comment'
                        id='review-comment'
                        disabled={this.props.review}
                        placeholder={this.props.comment || this.props.vocab.COMMENT_TIP} />
                </div>
            </Box>
        );
    }
}

const mapStateToProps = state => ({
    vocab: state.settings.language.vocabulary.COMMON_BUTTONS,
});

export default connect(mapStateToProps)(ReviewPane);
