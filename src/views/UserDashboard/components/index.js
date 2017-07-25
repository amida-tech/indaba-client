import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';

import SplitLayout from '../../../common/components/Dashboard/SplitLayout';
import MessageList from '../../../common/components/Dashboard/MessageList';
import UserGlance from './UserGlance';

class UserDashboard extends Component {
    render() {
        return (
            <div className='user-dashboard'>
                <SplitLayout>
                    <MessageList vocab={this.props.vocab}
                        messages={this.props.messages}/>
                    <UserGlance vocab={this.props.vocab} {...this.props.glance} />
                </SplitLayout>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    glance: {
        tasks: state.tasks.map(projectTasks =>
            projectTasks.tasks.filter(task =>
                task.userId === state.user.profile.id).length)
            .reduce((sum, projectTaskCount) => sum + projectTaskCount, 0),
    },
    vocab: state.settings.language.vocabulary,
    messages: state.messages,
});
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, actions), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);
