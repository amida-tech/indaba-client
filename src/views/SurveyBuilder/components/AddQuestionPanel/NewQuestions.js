import React, { Component } from 'react';
import { keys } from 'lodash';
import { Menu, Button } from 'grommet';
import IonIcon from 'react-ionicons';
import PropTypes from 'prop-types';

import { DYNAMIC } from '../../constants';

class NewQuestions extends Component {
    constructor(props) {
        super(props);
        this.handleInsert = this.handleInsert.bind(this);
    }

    handleInsert(type, sectionIndex) {
        const newQuestion = { type: type.toLowerCase(), text: '', required: false };
        if (DYNAMIC.includes(newQuestion.type)) {
            newQuestion.choices = [{ text: '' }, { text: '' }];
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
                            {this.props.sectionView < 0 ?
                                    <Menu responsive={true}
                                        icon={<IonIcon icon='ion-ios-plus'
                                            className='new-questions__icon'/>}>
                                        <span className='new-questions__insert-label'>
                                            {this.props.vocab.SURVEY.INSERT_INTO}
                                        </span>
                                        <div className='new-questions__menu-dropdown'>
                                            {this.props.options.map(option =>
                                                <div className='new-questions__menu-button'
                                                    key={`question-menu${type}${option.value}`}
                                                    onClick={() =>
                                                        this.handleInsert(type, option.value)}>
                                                    {option.label}
                                                </div>,
                                            )}
                                        </div>
                                    </Menu> :
                                <button className='new-questions__masked-button'
                                    onClick={() => this.handleInsert(type, this.props.sectionView)}>
                                    <IonIcon icon='ion-ios-plus'
                                        className='new-questions__icon'/>
                                </button>}
                        </div>
                    );
                })}
                <div className='new-questions__break'>
                    {this.props.vocab.SURVEY.SECTION_BREAK}
                    <Button
                        onClick={() =>
                            this.props.actions.insertSection()}>
                        <IonIcon icon='ion-minus'
                            className='new-questions__section-icon'/>
                    </Button>
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
