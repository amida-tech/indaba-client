import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'react-fa';
import IonIcon from 'react-ionicons';

import { INBOX_TABS } from '../../constants';

class InboxTabs extends Component {
    render() {
        const tabs = {
            [INBOX_TABS.INBOX]: {
                title: this.props.vocab.MESSAGES.INBOX,
                icon: () => <Icon name='envelope-o'
                    className='inbox-tabs__icon inbox-tabs__icon--inbox'/>,
            },
            [INBOX_TABS.ARCHIVED]: {
                title: this.props.vocab.MESSAGES.ARCHIVE,
                icon: () => <IonIcon icon='ion-ios-box'
                    className='inbox-tabs__icon inbox-tabs__icon--archive'/>,
            },
        };
        return (
            <div className='inbox-tabs'>
                {
                    Object.keys(tabs).map(key =>
                        <div key={key}
                            className={`inbox-tabs__tab ${this.props.active === key ? 'inbox-tabs__tab--active' : ''}`}
                            onClick={() => this.props.onSelectTab(key)} >
                            {tabs[key].icon()}
                            <div className='inbox-tabs__label'>
                                {tabs[key].title}
                            </div>
                        </div>,
                    )
                }
            </div>
        );
    }
}

InboxTabs.propTypes = {
    vocab: PropTypes.object.isRequired,
    active: PropTypes.string.isRequired,
    onSelectTab: PropTypes.func.isRequired,
};

export default InboxTabs;
