import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { Table } from 'antd';

import { FILTERS, SURVEY_STATUS } from '../constants';
import * as actions from '../actions';
import { getProjects } from '../../../common/actions/projectActions';
import { checkProtection } from '../../../common/actions/navActions';

import SplitLayout from '../../../common/components/Dashboard/SplitLayout';
import MessageList from '../../../common/components/Dashboard/MessageList';
import ProjectGlance from './ProjectGlance';
import ProjectListControls from './ProjectListControls';
import FlagCount from '../../../common/components/Dashboard/FlagCount';
import Time from '../../../utils/Time';

class PMDashboard extends Component {
    componentWillMount() {
        this.props.actions.checkProtection(this.props.profile)
            .then(() => {
                this.props.actions.getProjects(this.props.vocab.ERROR);
                this.props.actions.pmDashGetMessages();
            });
    }

    filterRow(row) {
        switch (this.props.ui.filter) {
        case FILTERS.ALL_FILTERS:
            return true;
        case FILTERS.ACTIVE_PROJECTS:
            return row.project.status === 1;
        case FILTERS.INACTIVE_PROJECTS:
            return row.project.status === 0;
        case FILTERS.PUBLISHED_SURVEYS:
            return row.survey.status === SURVEY_STATUS.PUBLISHED;
        case FILTERS.SURVEYS_IN_DRAFT_MODE:
            return row.survey.status === SURVEY_STATUS.DRAFT;
        case FILTERS.SURVEYS_WITH_FLAGS:
            return row.flags > 0;
        default:
            return true;
        }
    }

    searchRow(row) {
        const lowerQuery = this.props.ui.filterQuery.toLowerCase();
        if (_.isEmpty(row.survey)) {
            return row.project.name.toLowerCase().includes(lowerQuery);
        }
        return (row.project.name.toLowerCase().includes(lowerQuery)
            || row.survey.name.toLowerCase().includes(lowerQuery));
    }

    render() {
        return (
            <div className='pm-dashboard'>
                <SplitLayout>
                    <MessageList vocab={this.props.vocab}
                        messages={this.props.messages}
                        users={this.props.users}
                        onMessageClick={this.props.goToMessage}/>
                    <ProjectGlance vocab={this.props.vocab} {...this.props.glance}
                        flags={this.props.rows.reduce((sum, row) => sum + row.flags, 0)}/>
                </SplitLayout>
                <ProjectListControls vocab={this.props.vocab}
                    actions={this.props.actions}
                    filter={this.props.ui.filter} />
                <div>
                    <Table dataSource={this.props.rows.filter(this.filterRow.bind(this)).filter(this.searchRow.bind(this))}
                        onRowClick={row => this.props.router.push(`/project/${row.project.id}`)}
                        columns={[{
                            title: this.props.vocab.PROJECT.PROJECT,
                            dataIndex: 'project.name',
                            key: 'projectName',
                        },
                        {
                            title: this.props.vocab.PROJECT.STATUS,
                            dataIndex: 'project.status',
                            key: 'projectStatus',
                            render: status => (status
                                ? this.props.vocab.PROJECT.STATUS_ACTIVE
                                : this.props.vocab.PROJECT.STATUS_INACTIVE),
                        },
                        {
                            title: this.props.vocab.PROJECT.SURVEY,
                            dataIndex: 'survey.name',
                            key: 'surveyName',
                        },
                        {
                            title: 'Published',
                            dataIndex: 'survey.status',
                            key: 'surveyStatus',
                            render: status => ((status === 'published')
                                ? this.props.vocab.SURVEY.PUBLISHED
                                : this.props.vocab.SURVEY.DRAFT),
                        },
                        {
                            title: this.props.vocab.PROJECT.FLAGS,
                            dataIndex: 'flags',
                            key: 'flags',
                            render: flag => <FlagCount value={flag}/>,
                        },
                        {
                            title: this.props.vocab.PROJECT.LAST_UPDATED,
                            dataIndex: 'project.lastUpdated',
                            key: 'lastUpdated',
                            render: date => Time.renderCommon(date),
                        }]
                        }
                    />
                </div>
            </div>
        );
    }
}

PMDashboard.propTypes = {
    vocab: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
};

const mapStateToProps = store => ({
    vocab: store.settings.language.vocabulary,
    ui: store.pmdashboard.ui,
    profile: store.user.profile,
    rows: store.projects.data.map(project => ({
        key: project.id,
        project: _.pick(project, ['name', 'status', 'id', 'lastUpdated']),
        survey: _.pick(store.surveys.data.find(survey => survey.id === project.surveyId), ['name', 'status', 'id']),
        flags: project.flags || 0,
        flagHistory: project.flagHistory || false,
    })),
    glance: {
        projects: store.projects.data.length,
        active: store.projects.data.filter(project => project.status === 1).length,
        inactive: store.projects.data.filter(project => project.status === 0).length,
        // flags calculated inline from rows.flags
    },
    messages: store.pmdashboard.messages.slice(0, 4),
    users: store.user.users,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({},
        actions,
        { getProjects, checkProtection }),
    dispatch),
    goToMessage: id => dispatch(push(`/messages/${id}`)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PMDashboard);
