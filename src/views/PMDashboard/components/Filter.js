import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Filter extends Component {
    render() {
        return (
            <div className='filter'>
                {this.props.filters.map(filter =>
                    <div className='filter__button'
                        key={filter.key}
                        onClick={() => this.props.onFilterClick(filter.key)}>
                        {filter.label}
                    </div>,
                )}
            </div>
        );
    }
}

Filter.propTypes = {
    filters: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            key: PropTypes.string,
        }),
    ).isRequired,
    onFilterClick: PropTypes.func.isRequired,
};

export default Filter;
