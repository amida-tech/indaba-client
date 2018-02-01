import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import scroller from 'react-scroll/modules/mixins/scroller';
import { get } from 'lodash';

import FlagHeader from './FlagHeader';
import FlagQuestionList from './FlagQuestionList';
import FlagCommentary from './FlagCommentary';
import FlagControlsForm from './FlagControlsForm';

class FlagSidebar extends Component {
    componentDidMount() {
        setTimeout(() => {
            scroller.scrollTo(`question${this.props.ui.showQuestions[0]}`, {
                smooth: true,
                containerId: 'task-review__details-and-survey',
            });
        }, 0);
    }

    render() {
        const initialValues = {
            questionId: this.props.ui.flagSidebar.activeId,
            taskId: this.props.task.id,
            stepId: this.props.task.stepId,
        };
        const completed = get(this.props, 'task.status') === 'completed';
        return (
            <Box className='flag-sidebar'>
                <FlagHeader {...this.props} />
                <div className='flag-sidebar__container'>
                    <FlagQuestionList {...this.props} />
                    <div className='flag-sidebar__controls'>
                        <FlagCommentary
                            actions={this.props.actions}
                            users={this.props.users}
                            ui={this.props.ui}
                            vocab={this.props.vocab}
                            completed={completed} />
                        {!completed &&
                            <FlagControlsForm
                                {...this.props}
                                initialValues={initialValues} />
                        }
                    </div>
                </div>
            </Box>
        );
    }
}

export default FlagSidebar;
