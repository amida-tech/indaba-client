import React, { Component } from 'react';
import { List, ListItem } from 'grommet';
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
        // list selection breaks if selected is passed in as undefined inline
        const listProps = {
            selectable: 'multiple',
            onSelect: this.props.onSelect,
        };
        if (this.props.selected) {
            listProps.selected =
                this.props.selected.length === 1 ?
                this.props.selected[0] :
                this.props.selected;
        }

        return (
            <div className='filtered-list'>
                <SearchInput
                    placeholder={this.props.placeHolder}
                    onChange={this.handleQuery}/>
                <List className='filtered-list'
                    {...listProps}>
                    {this.props.items.map((item) => {
                        console.log('>>>>> FilteredList > item: ', item);
                        return (
                        <ListItem className='filtered-list__item'
                            key={item.key}
                            style={{ display: this.filter(item) ? undefined : 'none' }}>
                            {item.label}
                        </ListItem>
                        );
                    })}
                </List>
            </div>
        );
    }
}

export default FilteredList;
