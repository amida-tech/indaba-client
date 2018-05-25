import React, { Component } from 'react';

class List extends Component {

    renderListItem() {
        const items = this.props.items.map((item, index) => {
            // console.log('>>>>> renderListItem > index: ', index);
            // console.log('>>>>> renderListItem > item: ', item);

            const className = this.props.selected === index
                ? 'filtered-list__item filtered-list__item--selected'
                : 'filtered-list__item';

            console.log('>>>>> renderListItem > selected: ', this.props.selected);
            console.log('>>>>> renderListItem > index: ', index);
            console.log('>>>>> renderListItem > className: ', className);

            return (
                <div
                    className={className}
                    key={`index-${index}-id-${item.key}`}
                    onClick={this.props.onSelect.bind(this, index)}
                    // data-index={index}
                >
                    {item.label}
                </div>
            );
        });
        return items;
    }

    render() {
        // vars
        console.log('>>>>> List > selected: ', this.props.selected);

        return (
            <div className='filtered-list'>
                {this.renderListItem()}
            </div>
        );
    }
}

export default List;
