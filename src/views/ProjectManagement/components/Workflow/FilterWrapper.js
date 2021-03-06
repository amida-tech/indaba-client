import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Filter from '../../../../common/components/Filter';
import SubjectModal from '../Modals/Subject';

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
                    onFilterClick={filter => this.props.actions.toggleFilter(filter, this.props.project.id)}
                    noSpace={true} />
                <div className='filter-wrapper__add-button-panel'>
                    <button className='filter-wrapper__add-button'
                        onClick={() => this.props.actions.showStageModal(true)}>
                        {this.props.vocab.PROJECT.ADD_STAGE}
                    </button>
                    <button className='filter-wrapper__add-button'
                        onClick={() => this.props.actions.showAddSubjectModal(true)}>
                        {this.props.vocab.PROJECT.ADD_SUBJECT}
                    </button>
                </div>
                {this.props.ui.showAddSubject
                    && <SubjectModal
                        vocab={this.props.vocab}
                        onCancel={() => this.props.actions.showAddSubjectModal(false)}
                        onAddSubject={(subjects) => {
                            this.props.actions.showAddSubjectModal(false);
                            this.props.actions.addSubject(
                                this.props.project,
                                subjects,
                                false,
                                this.props.vocab.ERROR,
                            );
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
