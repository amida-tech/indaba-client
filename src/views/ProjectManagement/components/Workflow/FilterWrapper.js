import React, { Component } from 'react';
import { Button } from 'grommet';
import PropTypes from 'prop-types';

import Filter from '../../../../common/components/Filter';
import AddSubject from '../Modals/AddSubject';

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
                        primary={true}
                        label={this.props.vocab.PROJECT.ADD_STAGE}
                        onClick={() => this.props.actions.showStageModal(true)}/>
                    <Button className='filter-wrapper__add-button'
                        primary={true}
                        label={this.props.vocab.PROJECT.ADD_SUBJECT}
                        onClick={() => this.props.actions.showAddSubjectModal(true)}/>
                </div>
                {this.props.ui.showAddSubject &&
                    <AddSubject
                        vocab={this.props.vocab}
                        projectId={this.props.project.id}
                        onCancel={() => this.props.actions.showAddSubjectModal(false)}
                        onAddSubject={(subject) => {
                            this.props.actions.showAddSubjectModal(false);
                            this.props.actions.addSubject(
                                this.props.project,
                                [{ name: subject }],
                                false,
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
        filter: PropTypes.string,
    }).isRequired,
};

export default FilterWrapper;
