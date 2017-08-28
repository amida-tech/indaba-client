import React, { Component } from 'react';
import { Button } from 'grommet';
import PropTypes from 'prop-types';

import Filter from '../../../../common/components/Filter';
import AddSubject from '../Modals/AddSubject';
import AddStageModal from '../Modals/AddStage';

class FilterWrapper extends Component {
    render() {
        const filters = [{
            label: this.props.vocab.PROJECT.FILTER_UNASSIGNED,
            key: 'unassigned',
        }, {
            label: this.props.vocab.PROJECT.FILTER_LATE,
            key: 'late',
        }, {
            label: this.props.vocab.PROJECT.FILTER_IN_PROGRESS,
            key: 'inprogress',
        }, {
            label: this.props.vocab.PROJECT.FILTER_NOT_STARTED,
            key: 'notstarted',
        }, {
            label: this.props.vocab.PROJECT.FILTER_FLAGGED,
            key: 'flagged',
        }];

        return (
            <div className='filter-wrapper'>
                <Filter filters={filters}
                    active={this.props.project.filter}
                    onFilterClick={filter =>
                        this.props.actions.toggleFilter(filter, this.props.project.id)}
                    noSpace={true} />
                <div className='filter-wrapper__add-button-panel'>
                    <Button className='filter-wrapper__add-button'
                        primary={true} label={this.props.vocab.PROJECT.ADD_STAGE}
                        onClick={() => this.props.actions.showAddStageModal(true)}/>
                    <Button className='filter-wrapper__add-button'
                        primary={true} label={this.props.vocab.PROJECT.ADD_SUBJECT}
                        onClick={() => this.props.actions.showAddSubjectModal(true)}/>
                </div>
                {this.props.ui.showAddStage &&
                    <AddStageModal
                        vocab={this.props.vocab}
                        projectId={this.props.project.id}
                        onCancel={() => this.props.actions.showAddStageModal(false)}
                        onAddStage={(stage) => {
                            this.props.actions.showAddStageModal(false);
                            this.props.actions.addStage(
                                this.props.project,
                                stage,
                                this.props.vocab.ERROR);
                        }}
                        userGroups={this.props.project.userGroups}
                    />
                }
                {this.props.ui.showAddSubject &&
                    <AddSubject
                        vocab={this.props.vocab}
                        projectId={this.props.project.id}
                        onCancel={() => this.props.actions.showAddSubjectModal(false)}
                        onAddSubject={(subject) => {
                            this.props.actions.showAddSubjectModal(false);
                            this.props.actions.addSubject(
                                this.props.project,
                                subject,
                                this.props.vocab.ERROR);
                        }}
                    />
                }
            </div>
        );
    }
}

FilterWrapper.propTypes = {
    vocab: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
    project: PropTypes.shape({
        id: PropTypes.number,
        filter: PropTypes.object,
    }).isRequired,
};

export default FilterWrapper;
