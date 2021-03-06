import React, { Component } from 'react';
import PropTypes from 'prop-types';

class StaticQuestion extends Component {
    render() {
        let QuestionDisplay;
        switch (this.props.type) {
        case 'bullet':
            QuestionDisplay = (
                <div className='static-question__bulletgroup'>
                    <input className='static-question__bulletpoint1'
                        type='text'
                        disabled={true}
                        placeholder={this.props.vocab.SURVEY.USER_ENTERS} />
                    <input className='static-question__bulletpoint2'
                        type='text'
                        disabled={true}
                        placeholder={this.props.vocab.SURVEY.BP_ENTERS} />
                </div>);
            break;
        case 'date':
            QuestionDisplay = (
                <input className='static-question__date'
                    type='date'
                    format='MM/DD/YYYY'
                    disabled={true} />);
            break;
        case 'integer':
            QuestionDisplay = (
                <input className='static-question__integer'
                    type='number'
                    placeholder={this.props.vocab.SURVEY.NUM_ENTER}
                    disabled={true} />);
            break;
        default:
            QuestionDisplay = (
                <input className='static-question__text'
                    type='text'
                    placeholder={this.props.vocab.SURVEY.USER_ENTERS}
                    disabled={true} />);
        }
        return (
            <div className='static-question'>
                <div className='static-question__instructions'>
                    {this.props.vocab.SURVEY.QUESTIONS_EXPLAINED[
                        this.props.type.toUpperCase()]}
                </div>
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
