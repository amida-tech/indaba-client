import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import scroller from 'react-scroll/modules/mixins/scroller';
import { find, findIndex, get, some } from 'lodash';

import { renderName } from '../../../../utils/User';
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
        const userOptions = this.props.projectUsers ?
            this.props.projectUsers.filter(projUser => projUser !== this.props.profile.id)
            .map((projUserId) => {
                const current = find(this.props.users, user => user.id === projUserId);
                return {
                    label: renderName(current),
                    value: current.id,
                };
            }) : [];
        const initialValues = {
            questionId: this.props.ui.flagSidebar.activeId,
            taskId: this.props.task.id,
            stepId: this.props.task.stepId,
            userId: userOptions[0] === undefined ? null : userOptions[0].value,
        };
        const completed = get(this.props, 'task.status') === 'completed';
        const activeIndex = findIndex(this.props.ui.flags, flag =>
            parseInt(flag.questionId, 10) === this.props.ui.flagSidebar.activeId);
        const formDisabled = !(this.props.taskedUser.id === this.props.profile.id ||
            some(get(this.props.ui.flags[activeIndex], 'discussion'), chat =>
            (chat.userId === this.props.profile.id ||
            chat.userFromId === this.props.profile.id) && !chat.isResolve));

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
                            activeIndex={activeIndex}
                            completed={completed} />
                        {!completed &&
                            <FlagControlsForm
                                {...this.props}
                                disabled={formDisabled}
                                userOptions={userOptions}
                                initialValues={initialValues} />
                        }
                    </div>
                </div>
            </Box>
        );
    }
}

export default FlagSidebar;
