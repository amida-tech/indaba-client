import React, { Component } from 'react';
import List from './List';
import SearchInput from '../../../common/components/Dashboard/SearchInput';

class FilteredList extends Component {
    constructor(props) {
        super(props);
        this.state = { query: '' };
        this.handleQuery = this.handleQuery.bind(this);
    }

    filter(item) {
        return item.searchKey.toLowerCase().includes(this.state.query.toLowerCase());
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
                <SearchInput
                    placeholder={this.props.placeHolder}
                    onChange={this.handleQuery}
                />
                <List
                    {...listProps}
                    items={this.props.items}
                />
            </div>
        );
    }
}

export default FilteredList;
