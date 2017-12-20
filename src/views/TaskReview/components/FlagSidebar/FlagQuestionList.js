import React, { Component } from 'react';
import { some } from 'lodash';
import scroller from 'react-scroll/modules/mixins/scroller';
import PropTypes from 'prop-types';

class FlagQuestionList extends Component {
    constructor(props) {
        super(props);
        this.onChangeQuestion = this.onChangeQuestion.bind(this);
    }

    onChangeQuestion(id, index) {
        this.props.actions.updateQuestionDisplay([index]);
        this.props.actions.setActiveFlag(id, new Date());
        scroller.scrollTo(`question${index}`, {
            smooth: true,
            containerId: 'task-review__details-and-survey',
        });
    }

    render() {
        return (
            <div className='flag-question-list'>
                {this.props.displaySurvey.map((question, index) => {
                    let modifier = '';
                    if (question.id === this.props.ui.flagSidebar.activeId ||
                        (this.props.ui.flagSidebar.activeId === -1 && index === 0)) {
                        modifier = '--selected';
                    } else if (some(this.props.ui.flags, flag =>
                        parseInt(flag.questionId, 10) === question.id)) {
                        modifier = '--inactive';
                    }
                    return (
                        <div key={`listitem${question}${index}`}
                            className={`flag-question-list__item flag-question-list__item${modifier}`}
                            onClick={this.onChangeQuestion.bind(event, question.id, index)}>
                            {this.props.vocab.PROJECT.QUESTION_ + (index + 1) }
                        </div>
                    );
                })
                }
            </div>
        );
    }
}

FlagQuestionList.propTypes = {
    displaySurvey: PropTypes.arrayOf(PropTypes.object).isRequired,
    vocab: PropTypes.object.isRequired,
};

export default FlagQuestionList;
