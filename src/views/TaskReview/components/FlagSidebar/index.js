import React, { Component } from 'react';
import Box from 'grommet/components/Box';

import FlagHeader from './FlagHeader';
import FlagQuestionList from './FlagQuestionList';
import FlagCommentary from './FlagCommentary';
import FlagControls from './FlagControls';

class FlagSidebar extends Component {
    componentWillMount() {
        const issues = this.props.survey.filter(question => question.flag === true);
        this.props.actions.storeFlaggedIssues(issues);
        this.props.actions.setActiveFlag(issues[0], new Date());
        this.props.actions.updateNotifyUser(this.props.users[0]);
        this.props.actions.setSignatureId(this.props.profile.id);
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
