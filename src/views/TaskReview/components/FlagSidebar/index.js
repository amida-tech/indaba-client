import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import scroller from 'react-scroll/modules/mixins/scroller';

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
        console.log('FlagSidebar');
        console.log(this.props);
        const initialValues = {
            questionId: this.props.ui.flagSidebar.activeId,
            taskId: this.props.task.id,
            stepId: this.props.task.stepId,
        };
        return (
            <Box className='flag-sidebar'>
                <FlagHeader {...this.props} />
                <div className='flag-sidebar__container'>
                    <FlagQuestionList {...this.props} />
                    <div className='flag-sidebar__controls'>
                        <FlagCommentary {...this.props} />
                        <FlagControlsForm
                            {...this.props}
                            initialValues={initialValues} />
                    </div>
                </div>
            </Box>
        );
    }
}

export default FlagSidebar;
