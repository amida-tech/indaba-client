import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FILTERS } from '../constants';

import Filter from './Filter';

class ProjectFilter extends Component {
    render() {
        const filters = [
            {
                label: this.props.vocab.PROJECT_LIST_FILTER.ALL_PROJECTS,
                key: FILTERS.ALL_PROJECTS,
            }, {
                label: this.props.vocab.PROJECT_LIST_FILTER.ACTIVE_PROJECTS,
                key: FILTERS.ACTIVE_PROJECTS,
            }, {
                label: this.props.vocab.PROJECT_LIST_FILTER.INACTIVE_PROJECTS,
                key: FILTERS.INACTIVE_PROJECTS,
            }, {
                label: this.props.vocab.PROJECT_LIST_FILTER.PUBLISHED_SURVEYS,
                key: FILTERS.PUBLISHED_SURVEYS,
            }, {
                label: this.props.vocab.PROJECT_LIST_FILTER.SURVEYS_IN_DRAFT_MODE,
                key: FILTERS.SURVEYS_IN_DRAFT_MODE,
            }, {
                label: this.props.vocab.PROJECT_LIST_FILTER.SURVEYS_WITH_FLAGS,
                key: FILTERS.SURVEYS_WITH_FLAGS,
            },
        ];

        return (
            <Filter active={this.props.active}
                filters={filters}
                onFilterClick={this.props.onSetFilter}/>
        );
    }
}

ProjectFilter.propTypes = {
    active: PropTypes.string.isRequired,
    vocab: PropTypes.object.isRequired,
    onSetFilter: PropTypes.func.isRequired,
};

export default ProjectFilter;
