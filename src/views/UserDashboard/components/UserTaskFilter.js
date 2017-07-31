import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FILTERS } from '../constants';

import Filter from '../../../common/components/Dashboard/Filter';

class UserTaskFilter extends Component {
    render() {
        const filters = [
            {
                label: this.props.vocab.USER_TASK_LIST_FILTER.NEW_TASKS,
                key: FILTERS.NEW_TASKS,
            }, {
                label: this.props.vocab.USER_TASK_LIST_FILTER.LATE_TASKS,
                key: FILTERS.LATE_TASKS,
            }, {
                label: this.props.vocab.USER_TASK_LIST_FILTER.DUE_TODAY,
                key: FILTERS.DUE_TODAY,
            }, {
                label: this.props.vocab.USER_TASK_LIST_FILTER.FLAGS,
                key: FILTERS.FLAGS,
            }, {
                label: this.props.vocab.USER_TASK_LIST_FILTER.DUE_TOMORROW,
                key: FILTERS.DUE_TOMORROW,
            }, {
                label: this.props.vocab.USER_TASK_LIST_FILTER.DUE_THIS_WEEK,
                key: FILTERS.DUE_THIS_WEEK,
            },
        ];

        return (
            <Filter active={this.props.active}
                filters={filters}
                onFilterClick={this.props.onSetFilter}/>
        );
    }
}

UserTaskFilter.propTypes = {
    active: PropTypes.string.isRequired,
    vocab: PropTypes.object.isRequired,
    onSetFilter: PropTypes.func.isRequired,
};

export default UserTaskFilter;
