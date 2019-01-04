import React, { Component } from 'react';
import { keys } from 'lodash';
import IonIcon from 'react-ionicons';
import PropTypes from 'prop-types';

import { DYNAMIC } from '../../constants';
import Menu from '../../../../common/components/Menu';
class NewQuestions extends Component {
    constructor(props) {
        super(props);
        this.handleInsert = this.handleInsert.bind(this);
    }

    handleInsert(type, sectionIndex) {
        const newQuestion = { type: type.toLowerCase(), text: '', required: false };
        if (newQuestion.type === 'dropdown') {
            newQuestion.type = 'choice';
            newQuestion.meta = { subType: 'dropdown' };
        }
        if (DYNAMIC.includes(newQuestion.type)) {
            if (newQuestion.type === 'scale') {
                newQuestion.scaleLimits = { min: 0, max: 10 };
            } else {
                newQuestion.choices = [{ text: '' }, { text: '' }];
            }
        }
        this.props.actions.insertQuestion(sectionIndex, newQuestion);
    }

    render() {
        return (
            <div className='new-questions'>
                {keys(this.props.vocab.SURVEY.QUESTIONS_TYPES).map((type) => {
                    return (
                        <div className='new-questions__types'
                            key={`question-type${type}`}>
                            {this.props.vocab.SURVEY.QUESTIONS_TYPES[type]}
                            {this.props.sectionView < 0
                                ? <Menu
                                    vocab={this.props.vocab}
                                    options={this.props.options}
                                    type={type}
                                    handleOptionSelection={this.handleInsert} />
                                : <button className='new-questions__masked-button'
                                    onClick={() => this.handleInsert(type, this.props.sectionView)}>
                                    <IonIcon icon='ion-ios-plus'
                                        className='new-questions__icon'/>
                                </button>}
                        </div>
                    );
                })}
                <div className='new-questions__break'>
                    {this.props.vocab.SURVEY.SECTION_BREAK}
                    <button className='new-questions__masked-button'
                        onClick={() => this.props.actions.insertSection()}>
                        <IonIcon icon='ion-minus'
                            className='new-questions__section-icon'/>
                    </button>
                </div>
            </div>
        );
    }
}

NewQuestions.propTypes = {
    options: PropTypes.array,
    sectionView: PropTypes.number.isRequired,
    actions: PropTypes.object,
    vocab: PropTypes.object.isRequired,
};

export default NewQuestions;
