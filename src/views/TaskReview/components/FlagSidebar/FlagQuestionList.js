import React, { Component } from 'react';
import { List, ListItem } from 'grommet';
import _ from 'lodash';
import PropTypes from 'prop-types';

class FlagQuestionList extends Component {
    render() {
        return (
            <List className='flag-question-list'>
                {this.props.survey.map((question, index) => {
                    return (_.some(this.props.ui.flags, flag =>
                        flag.id === question.id)) ?
                        <ListItem key={`listitem${question}${index}`}
                            className={question.id === this.props.ui.flagSidebar.active.id ?
                                'flag-question-list__item flag-question-list__item--selected' :
                                'flag-question-list__item flag-question-list__item'}
                            onClick={this.props.actions.setActiveFlag.bind(event, question)}>
                            {this.props.vocab.PROJECT.QUESTION_ + (index + 1) }
                        </ListItem> :
                        <ListItem key={`listitem${question}${index}`}
                            className='flag-question-list__item flag-question-list__item--inactive'>
                            {this.props.vocab.PROJECT.QUESTION_ + (index + 1) }
                        </ListItem>;
                })}
            </List>
        );
    }
}

FlagQuestionList.propTypes = {
    survey: PropTypes.arrayOf(PropTypes.object).isRequired,
    vocab: PropTypes.object.isRequired,
};

export default FlagQuestionList;
