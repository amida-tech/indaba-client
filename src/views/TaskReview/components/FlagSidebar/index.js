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
        this.props.actions.setActiveFlag(issues[0]);
        // return state = {
        //     flags: issues,
        //     activeFlag: issues.length > 0 ? issues[0].flagHistory : null,
        //     activeId: issues.length > 0 ? issues[0].id : null,
        //     notifyUserId: 0,
        //     comment: '',
        //     resolved: false,
        //     notifyUsername: props.user.users[0].name,
        // }
    }
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Box className='flag-sidebar'>
                <FlagHeader {...this.props} />
                <div className='flag-sidebar__questions-answers'>
                    <FlagQuestionList {...this.props} />
                    <FlagCommentary {...this.props} />
                </div>
            </Box>
        );
    }
}

export default FlagSidebar;


//
// <FlagControls {...this.props} />
