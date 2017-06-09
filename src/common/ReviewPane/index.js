import React, { Component } from 'react';
import { connect } from 'react-redux';
import Box from 'grommet';
import IonIcon from 'react-ionicons';

import * as Questions from '../Questions';

class ReviewPane extends Component {
    constructor(props){
        super(props);
        this.state = {
            type: 'Date'
        };
        this.handleClickReview = this.handleClickReview.bind(this);
    }

    handleClickReview(event) {
        console.log(event.target.value);
    }

    render() {
        const Question = Questions[this.state.type];
        return (
            <Box>
                <IonIcon className='right-icon' icon='ion-ios-flag'/>
                <div className='review-panel'>
                    <label className='radio-inline'>
                        <input type='radio'
                            id='review-agree'
                            name='review-assessment'
                            value='true'
                            onChange={this.handleClickReview} />
                        <span>{this.props.vocab.PROJECT.AGREE}</span>
                    </label>
                    <label className='radio-inline'>
                        <input type='radio'
                            id='review-disagree'
                            name='review-assessment'
                            value='false'
                            onChange={this.handleClickReview} />
                        <span>{this.props.vocab.PROJECT.DISAGREE}</span>
                    </label>
                </div>
            </Box>
        )
    }
}

const mapStateToProps = state => ({
    vocab: state.settings.language.vocabulary,
});

export default connect(mapStateToProps)(ReviewPane);
