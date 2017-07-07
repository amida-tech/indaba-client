import React, { Component } from 'react';

class FilterBar extends Component {
    render() {
        return (
            <div className='filter-bar'>
                {this.props.options.map(option => (
                <div key={option.key}
                    className={`filter ${(this.props.filter === option.key) ? ' filter-checked' : ''}`}
                    onClick={() => this.props.onToggleFilter(option.key, this.props.projectId)}>
                        {option.label}
                </div>))}
            </div>
        );
    }
}

export default FilterBar;
