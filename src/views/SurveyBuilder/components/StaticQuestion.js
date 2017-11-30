import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DateTime } from 'grommet';

class StaticQuestion extends Component {
    render() {
        let QuestionDisplay;
        switch (this.props.type) {
        case 'bulletpoint':
            QuestionDisplay = (
                <div className='static-question__entry'>
                    <span className='static-question__instructions'>
                        {this.props.vocab.SURVEY.QUESTIONS_EXPLAINED.BULLETPOINT}
                    </span>
                    <div className='static-question__bulletgroup'>
                        <input className='static-question__bulletpoint1'
                            type='text'
                            disabled={true}
                            placeholder={this.props.vocab.SURVEY.USER_ENTERS} />
                        <input className='static-question__bulletpoint2'
                            type='text'
                            disabled={true}
                            placeholder={this.props.vocab.SURVEY.BP_ENTERS} />
                    </div>
                </div>);
            break;
        case 'date':
            QuestionDisplay = (
                <div className='static-question__entry'>
                    <span className='static-question__instructions'>
                        {this.props.vocab.SURVEY.QUESTIONS_EXPLAINED.DATE}
                    </span>
                    <DateTime className='static-question__date'
                        format='MM/DD/YYYY'
                        disabled={true} />
                </div>);
            break;
        case 'integer':
            QuestionDisplay = (
                <div className='static-question__entry'>
                    <span className='static-question__instructions'>
                        {this.props.vocab.SURVEY.QUESTIONS_EXPLAINED.INTEGER}
                    </span>
                    <input className='static-question__integer'
                        type='number'
                        placeholder={this.props.vocab.SURVEY.NUM_ENTER}
                        disabled={true} />
                </div>);
            break;
        default:
            QuestionDisplay = (
                <div className='static-question__entry'>
                    <span className='static-question__instructions'>
                        {this.props.vocab.SURVEY.QUESTIONS_EXPLAINED.TEXT}
                    </span>
                    <input className='static-question__text'
                        type='text'
                        placeholder={this.props.vocab.SURVEY.USER_ENTERS}
                        disabled={true} />
                </div>);
        }
        return (
            <div className='static-question'>
                {QuestionDisplay}
            </div>
        );
    }
}

StaticQuestion.propTypes = {
    type: PropTypes.string.isRequired,
    vocab: PropTypes.object.isRequired,
};

export default StaticQuestion;
