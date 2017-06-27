import React, { Component } from 'react';
import { Box, TextInput, List, ListItem } from 'grommet';

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

        return (<Box pad={{ between: 'small' }}>
            <TextInput
                placeHolder={this.props.placeHolder}
                onDOMChange={this.handleQuery}/>
            <List {...listProps}>
                {this.props.items.map(item => (
                    <ListItem
                        key={item.key}
                        style={{ display: this.filter(item) ? undefined : 'none' }}>
                        {item.label}
                    </ListItem>
                ))}
            </List>
        </Box>);
    }
}

export default FilteredList;
