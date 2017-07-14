import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import * as actions from '../actions';

import SplitLayout from './SplitLayout';
import MessageList from './MessageList';
import ProjectGlance from './ProjectGlance';
import ProjectListControls from './ProjectListControls';
import ProjectListHeader from './ProjectListHeader';
import ProjectListEntry from './ProjectListEntry';

class PMDashboard extends Component {
    render() {
        return (
            <div className='pm-dashboard'>
                <SplitLayout>
                    <MessageList />
                    <ProjectGlance vocab={this.props.vocab} {...this.props.glance}
                        flags={this.props.rows.reduce((sum, row) => sum + row.flags, 0)}/>
                </SplitLayout>
                <ProjectListControls vocab={this.props.vocab}
                    actions={this.props.actions}
                    filter={this.props.ui.filter} />
                <ProjectListHeader vocab={this.props.vocab} />
                {this.props.rows.map(row =>
                    <ProjectListEntry key={row.project.id} {...row} />)}
            </div>
        );
    }
}

PMDashboard.propTypes = {
    vocab: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    vocab: state.settings.language.vocabulary,
    ui: state.pmdashboard.ui,
    rows: state.projects.map(project => ({
        project: _.pick(project, ['name', 'status', 'id']),
        survey: _.pick(state.surveys.find(survey => survey.projectId === project.id), ['name', 'status', 'id']),
        flags: state.discuss.filter(discuss =>
            state.tasks.find(taskSet =>
                taskSet.tasks.some(task => task.id === discuss.taskId)).projectId === project.id)
            .reduce((sum, discuss) =>
                sum + discuss.discuss.filter(innerDiscuss => innerDiscuss.flag).length, 0),
    })),
    glance: {
        projects: state.projects.length,
        active: state.projects.filter(project => project.status === 'Active').length,
        inactive: state.projects.filter(project => project.status === 'Inactive').length,
        // flags calculated inline from rows.flags
    },
});
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, actions), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PMDashboard);
