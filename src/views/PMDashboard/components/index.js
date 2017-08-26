import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import { FILTERS } from '../constants';
import * as actions from '../actions';

import { setProjectName } from '../../../common/actions/projectActions';
import { setSurveyName } from '../../../common/actions/surveysActions';

import NameChangeModal from './NameChangeModal';
import SplitLayout from '../../../common/components/Dashboard/SplitLayout';
import MessageList from '../../../common/components/Dashboard/MessageList';
import ProjectGlance from './ProjectGlance';
import ProjectListControls from './ProjectListControls';
import ProjectListHeader from './ProjectListHeader';
import ProjectListEntry from './ProjectListEntry';

class PMDashboard extends Component {
    filterRow(row) {
        switch (this.props.ui.filter) {
        case FILTERS.ALL_FILTERS:
            return true;
        case FILTERS.ACTIVE_PROJECTS:
            return row.project.status === 'Active';
        case FILTERS.INACTIVE_PROJECTS:
            return row.project.status === 'Inactive';
        case FILTERS.PUBLISHED_SURVEYS:
            return row.survey.status === 'Published';
        case FILTERS.SURVEYS_IN_DRAFT_MODE:
            return row.survey.status === 'Draft';
        case FILTERS.SURVEYS_WITH_FLAGS:
            return row.flags > 0;
        default:
            return true;
        }
    }

    searchRow(row) {
        const lowerQuery = this.props.ui.searchQuery.toLowerCase();
        return row.project.name.toLowerCase().includes(lowerQuery) ||
            row.survey.name.toLowerCase().includes(lowerQuery);
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
                        .map(row => <ProjectListEntry key={row.project.id} {...row}
                            vocab={this.props.vocab}
                            onProjectNameChange={this.props.actions.setProjectName}
                            onProjectNameBlur={
                                (name) => {
                                    if (name !== row.project.name) {
                                        this.props.onSetProjectName(name, row.project.id);
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
                                        this.props.onSetSurveyName(name, row.project.id);
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
        survey: _.pick(state.surveys.find(survey => survey.projectId === project.id), ['name', 'status', 'id']),
        flags: 0, // Base on project listing, coming later.
    })),
    glance: {
        projects: state.projects.data.length,
        active: state.projects.data.filter(project => project.status === 'Active').length,
        inactive: state.projects.data.filter(project => project.status === 'Inactive').length,
        // flags calculated inline from rows.flags
    },
    messages: state.messages.slice(0, 4),
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, actions), dispatch),
    onSetProjectName: (name, projectId) => dispatch(setProjectName(name, projectId)),
    onSetSurveyName: (name, projectId) => dispatch(setSurveyName(name, projectId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PMDashboard);
