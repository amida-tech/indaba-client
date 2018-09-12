import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Tab extends Component {
    render() {
        const className = this.props.className ? `${this.props.className}__link` : 'tab__link';
        return (
            <li className={(this.props.className ? `${this.props.className} ` : 'tab ')
                + (this.props.classModifier ? `${this.props.className}--${this.props.classModifier}` : '')}>
                <div className={className + (this.props.isActive ? ` ${className}--active ` : ' ')}
                    onClick={(event) => {
                        event.preventDefault();
                        this.props.onClick(this.props.tabIndex);
                    }}>
                    <label className={this.props.className ? `${this.props.className}__title` : 'tab__title'}>
                        {this.props.title}
                    </label>
                </div>
            </li>
        );
    }
}

Tab.propTypes = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    tabIndex: PropTypes.number,
    isActive: PropTypes.bool,
    className: PropTypes.string,
    classModifier: PropTypes.string,
};

export default Tab;
