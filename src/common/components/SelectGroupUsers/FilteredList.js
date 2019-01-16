import React, { Component } from 'react';
import List from './List';
import FilterInput from '../Dashboard/FilterInput';
import PropTypes from 'prop-types';

class FilteredList extends Component {
    constructor(props) {
        super(props);
        this.state = { query: '' };
        this.handleQuery = this.handleQuery.bind(this);
    }

    handleQuery(evt) {
        this.setState({ query: evt.target.value });
    }

    render() {
        const listProps = {
            // selectable: 'multiple', // TODO
            onSelect: this.props.onSelect,
        };
        if (this.props.selected) {
            listProps.selected = this.props.selected.length === 1
                ? this.props.selected[0]
                : -1;
        }
        return (
            <div>
                <FilterInput
                    placeholder={this.props.placeholder}
                    onChange={this.handleQuery}
                    value={this.state.query}
                />
                <List
                    {...listProps}
                    items={this.props.items.filter((item) =>
                        item.filterKey.toLowerCase().includes(this.state.query.toLowerCase()))}
                />
            </div>
        );
    }
}

FilteredList.propTypes = {
    placeholder: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.object),
};

export default FilteredList;
