import React, { Component } from 'react';
import { Button } from 'grommet';
import FilterBar from './FilterBar';
import AddSubject from '../Modals/AddSubject';
import AddStage from '../Modals/AddStage';

class FilterWrapper extends Component {
    render() {
        const Filters = [{
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
                <FilterBar options={Filters}
                    filter={this.props.project.filter}
                    onToggleFilter={this.props.onToggleFilter}
                    projectId={this.props.project.id} />
                <div className='add-button-panel'>
                    <Button primary={true} label={this.props.vocab.PROJECT.ADD_STAGE}
                        onClick={() => this.props.showAddStageModal()}/>
                    <Button primary={true} label={this.props.vocab.PROJECT.ADD_SUBJECT}
                        onClick={() => this.props.showAddSubjectModal()}/>
                </div>
                {this.props.ui.showAddStage &&
                    <AddStage
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
