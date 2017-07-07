import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import scroller from 'react-scroll/modules/mixins/scroller';

import FlagHeader from './FlagHeader';
import FlagQuestionList from './FlagQuestionList';
import FlagCommentary from './FlagCommentary';
import FlagControls from './FlagControls';

class FlagSidebar extends Component {
    componentWillMount() {
        const initialShow = [];
        const issues = this.props.survey.filter((discussion, index) =>
            (discussion.flag === true ? initialShow.push(index) : false));
        this.props.actions.showQuestion(initialShow);
        this.props.actions.storeFlaggedIssues(issues);
        this.props.actions.setActiveFlag(issues[0] ? issues[0].id : 0, new Date());
        this.props.actions.updateNotifyUser(this.props.users[0]);
        this.props.actions.setSignatureId(this.props.profile.id);
    }

    componentDidUpdate() {
        scroller.scrollTo(`question${this.props.ui.showQuestions[0]}`, {
            smooth: true,
            containerId: 'task-review__details-and-survey',
        });
    }

    render() {
        return (
            <Box className='flag-sidebar'>
                <FlagHeader {...this.props} />
                <div className='flag-sidebar__container'>
                    <FlagQuestionList {...this.props} />
                    <div className='flag-sidebar__controls'>
                        <FlagCommentary {...this.props} />
                        <FlagControls {...this.props} />
                    </div>
                </div>
            </Box>
        );
    }
}

export default FlagSidebar;
