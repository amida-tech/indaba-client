import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Filter extends Component {
    isActive(key) {
        if (typeof this.props.active === 'string') {
            return key === this.props.active;
        } if (typeof this.props.active === 'object') {
            return this.props.active.includes(key);
        }
        return false;
    }

    render() {
        return (
            <div className={`filter ${this.props.noSpace ? 'filter--no-space' : ''}`}>
                {this.props.filters.map(filter => <div className={`filter__button ${this.isActive(filter.key) ? 'filter__button--active' : ''}`}
                    key={filter.key}
                    onClick={() => this.props.onFilterClick(filter.key)}>
                    {filter.label}
                </div>)}
            </div>
        );
    }
}

Filter.propTypes = {
    active: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
    ]),
    filters: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            key: PropTypes.string,
        }),
    ).isRequired,
    noSpace: PropTypes.bool,
    onFilterClick: PropTypes.func.isRequired,
};

export default Filter;
