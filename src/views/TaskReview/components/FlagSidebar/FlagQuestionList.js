import React, { Component } from 'react';
import { List, ListItem } from 'grommet';
import _ from 'lodash';

class FlagQuestionList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <List className='flag-question-list'>
                {this.props.survey.map((question, index) => {
                    return (_.some(this.props.ui.flagSidebar.flags, (flag) => flag.id === question.id)) ?
                        <ListItem key={'listitem' + question + index}
                            className={question.id === this.props.ui.flagSidebar.active.id ?
                                'flag-question-list__item flag-question-list__item--selected' :
                                'flag-question-list__item flag-question-list__item'}
                            onClick={this.props.actions.setActiveFlag.bind(event, question)}>
                            {this.props.vocab.PROJECT.QUESTION_ + (index + 1) }
                        </ListItem> :
                        <ListItem key={'listitem' + question + index}
                            className='flag-question-list__item flag-question-list__item--inactive'>
                            {this.props.vocab.PROJECT.QUESTION_ + (index + 1) }
                        </ListItem>
                })}
            </List>
        )
    }
}

// onClick={(event) => this.props.actions.setActiveFlag(event.target.value)}>

export default FlagQuestionList;
