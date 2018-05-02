import React, { Component, PropTypes } from 'react';

class Tabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTabIndex: this.props.defaultActiveTabIndex,
        };
        this.handleTabClick = this.handleTabClick.bind(this);
    }

    handleTabClick(tabIndex) {
        this.setState({
            activeTabIndex: tabIndex ===
                this.state.activeTabIndex ? this.props.defaultActiveTabIndex : tabIndex,
        });
    }

    renderTabsDisplay() {
        return React.Children.map(this.props.children, (child, index) => {
            return React.cloneElement(child, {
                onClick: this.handleTabClick,
                tabIndex: index,
                isActive: index === this.state.activeTabIndex,
            });
        });
    }

    renderActiveTabContent() {
        if (this.props.children[this.state.activeTabIndex]) {
            return this.props.children[this.state.activeTabIndex].props.children;
        }
        return this.props.children[this.props.defaultActiveTabIndex].props.children;
    }

    render() {
        return (
            <div className={this.props.className ? this.props.className : 'tabs'}>
                <ul className={this.props.className ? `${this.props.className}__nav` : 'tabs__nav'}>
                    {this.renderTabsDisplay()}
                </ul>
                <div className={this.props.className ? `${this.props.className}__content` : 'tabs__content'}>
                    {this.renderActiveTabContent()}
                </div>
            </div>
        );
    }
}

Tabs.propTypes = {
    defaultActiveTabIndex: PropTypes.number,
    className: PropTypes.string,
};

Tabs.defaultProps = {
    defaultActiveTabIndex: 0,
};

export default Tabs;
