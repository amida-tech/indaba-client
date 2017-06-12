import React, { Component } from 'react';
import { connect } from 'react-redux';
import Box from 'grommet/components/Box';
import IonIcon from 'react-ionicons';

import * as Questions from '../Questions';

class ReviewPane extends Component {
    constructor(props){
        super(props);
        this.handleClickReview = this.handleClickReview.bind(this);
        this.handleFlagClick = this.handleFlagClick.bind(this);
    }

    handleClickReview(event) {
        this.setState({review: event.target.value === 'true' ? true : false});
    }

    handleFlagClick(event) {
    }

    render() {
        const Question = Questions[this.props.type];
        return (
            <Box>
                {!this.props.taskView &&
                <button className='masked-button right-icon' onClick={this.handleFlagClick}>
                    <IonIcon className='right-icon' icon='ion-ios-flag'/>
                </button>}
                <Question {...this.props}/>
                <div className='review-panel'>
                    <label className='radio-inline'>
                        <input type='radio'
                            id='review-agree'
                            checked={this.props.review}
                            name='review-assessment'
                            value={true}
                            onChange={this.handleClickReview} />
                        <span>{this.props.vocab.AGREE}</span>
                    </label>
                    <label className='radio-inline'>
                        <input type='radio'
                            id='review-disagree'
                            checked={!this.props.review}
                            name='review-assessment'
                            value={false}
                            onChange={this.handleClickReview} />
                        <span>{this.props.vocab.DISAGREE}</span>
                    </label>
                    <input type='text'
                        className='comment'
                        id='review-comment'
                        disabled={this.props.review}
                        placeholder={this.props.comment || this.props.vocab.COMMENT_TIP} />
                </div>
            </Box>
        )
    }
}

const mapStateToProps = state => ({
    vocab: state.settings.language.vocabulary.COMMON_BUTTONS,
});

export default connect(mapStateToProps)(ReviewPane);
