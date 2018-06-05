import React, { Component } from 'react';
import PropTypes from 'prop-types';

class List extends Component {

    renderListItem() {
        if (this.props.itemsJSX) {
            return this.props.itemsJSX;
        }
        const items = this.props.items.map((item, index) => {
            const className = this.props.selected === index
                ? 'filtered-list__item filtered-list__item--selected'
                : 'filtered-list__item';
            return (
                <div
                    className={className}
                    key={`index-${index}-id-${item.key}`}
                    onClick={this.props.onSelect.bind(this, index)}
                >
                    {item.label}
                </div>
            );
        });
        return items;
    }
    render() {
        return (
            <div className={this.props.className || 'filtered-list'}>
                {this.renderListItem()}
            </div>
        );
    }
}

List.propTypes = {
    selected: PropTypes.number.isRequired,
    items: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
};

export default List;
