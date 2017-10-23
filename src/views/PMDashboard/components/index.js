import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import { FILTERS } from '../constants';
import * as actions from '../actions';

import { setProjectName, getProjects } from '../../../common/actions/projectActions';
import { setSurveyName } from '../../../common/actions/surveyActions';

import NameChangeModal from './NameChangeModal';
import SplitLayout from '../../../common/components/Dashboard/SplitLayout';
import MessageList from '../../../common/components/Dashboard/MessageList';
import ProjectGlance from './ProjectGlance';
import ProjectListControls from './ProjectListControls';
import ProjectListHeader from './ProjectListHeader';
import ProjectListEntry from './ProjectListEntry';

class PMDashboard extends Component {
    componentWillMount() {
        this.props.actions.getProjects(this.props.vocab.ERROR);
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
            return row.survey.status === 1;
        case FILTERS.SURVEYS_IN_DRAFT_MODE:
            return row.survey.status === 0;
        case FILTERS.SURVEYS_WITH_FLAGS:
            return row.flags > 0;
        default:
            return true;
        }
    }

    searchRow(row) {
        const lowerQuery = this.props.ui.searchQuery.toLowerCase();
        if (_.isEmpty(row.survey)) {
            return row.project.name.toLowerCase().includes(lowerQuery);
        }
        return (row.project.name.toLowerCase().includes(lowerQuery)
            || row.survey.name.toLowerCase().includes(lowerQuery));
    }

    render() {
        return (
            <div className='pm-dashboard'>
                {
                    this.props.ui.nameChangeModal &&
                    <NameChangeModal
                        {...this.props.ui.nameChangeModal}
                        vocab={this.props.vocab}
                        onOk={ () => this.props.actions.showNameChange(false) }/>
                }
                <SplitLayout>
                    <MessageList vocab={this.props.vocab}
                        messages={this.props.messages}/>
                    <ProjectGlance vocab={this.props.vocab} {...this.props.glance}
                        flags={this.props.rows.reduce((sum, row) => sum + row.flags, 0)}/>
                </SplitLayout>
                <ProjectListControls vocab={this.props.vocab}
                    actions={this.props.actions}
                    filter={this.props.ui.filter} />
                <div className='pm-dashboard__table'>
                    <ProjectListHeader vocab={this.props.vocab} />
                    {this.props.rows.filter(this.filterRow.bind(this))
                        .filter(this.searchRow.bind(this))
                        .map(row => <ProjectListEntry key={`proj${row.project.id}`} {...row}
                            vocab={this.props.vocab}
                            onProjectNameChange={this.props.actions.setProjectName}
                            onProjectNameBlur={
                                (name) => {
                                    if (name !== row.project.name) {
                                        this.props.actions.setProjectName(name, row.project.id);
                                        this.props.actions.showNameChange({
                                            title: this.props.vocab.PROJECT.PROJECT_NAME_CHANGED,
                                            label: this.props.vocab.PROJECT.NEW_PROJECT_NAME,
                                            name,
                                        });
                                    }
                                }
                            }
                            onSurveyNameChange={this.props.actions.setSurveyName}
                            onSurveyNameBlur={
                                (name) => {
                                    if (name !== row.survey.name) {
                                        this.props.actions.setSurveyName(name, row.project.id);
                                        this.props.actions.showNameChange({
                                            title: this.props.vocab.PROJECT.SURVEY_NAME_CHANGED,
                                            label: this.props.vocab.PROJECT.NEW_SURVEY_NAME,
                                            name,
                                        });
                                    }
                                }
                            }
                        />)}
                </div>
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
    rows: state.projects.data.map(project => ({
        project: _.pick(project, ['name', 'status', 'id', 'lastUpdated']),
        survey: _.pick(state.surveys.data.find(survey =>
            survey.projectId === project.id), ['name', 'status', 'id']),
        flags: 0, // Base on project listing, coming later.
    })),
    glance: {
        projects: state.projects.data.length,
        active: state.projects.data.filter(project => project.status === 1).length,
        inactive: state.projects.data.filter(project => project.status === 0).length,
        // flags calculated inline from rows.flags
    },
    messages: state.pmdashboard.messages.slice(0, 4),
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({},
        actions,
        { setProjectName, getProjects, setSurveyName }),
        dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PMDashboard);
