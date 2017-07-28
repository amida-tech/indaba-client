import React, { Component } from 'react';
import { Button } from 'grommet';
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
                        this.props.onToggleFilter(filter, this.props.project.id)}
                    noSpace={true} />
                <div className='filter-wrapper__add-button-panel'>
                    <Button className='filter-wrapper__add-button'
                        primary={true} label={this.props.vocab.PROJECT.ADD_STAGE}
                        onClick={() => this.props.showAddStageModal()}/>
                    <Button className='filter-wrapper__add-button'
                        primary={true} label={this.props.vocab.PROJECT.ADD_SUBJECT}
                        onClick={() => this.props.showAddSubjectModal()}/>
                </div>
                {this.props.ui.showAddStage &&
                    <AddStageModal
                        vocab={this.props.vocab}
                        projectId={this.props.project.id}
                        onCancel={() => this.props.closeAddStageModal()}
                        onAddStage={(stage) => {
                            this.props.closeAddStageModal();
                            this.props.onAddStage(stage, this.props.project.id);
                        }}
                        userGroups={this.props.project.userGroups}
                    />
                }
                {this.props.ui.showAddSubject &&
                    <AddSubject
                        vocab={this.props.vocab}
                        projectId={this.props.project.id}
                        onCancel={() => this.props.closeAddSubjectModal()}
                        onAddSubject={(subject) => {
                            this.props.closeAddSubjectModal();
                            this.props.onAddSubject(subject, this.props.project.id);
                        }}
                    />
                }
            </div>
        );
    }
}

export default FilterWrapper;
