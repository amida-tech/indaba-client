import React, { Component } from 'react';

import SubNavEntry from './SubNavEntry';

class SubNav extends Component {
    render() {
        const subNavEntries = this.props.vocab.PROJECT.TABS.map((value) => {
            return {
                label: value,
                key: value.toLowerCase(),
            };
        });

        return (
            <div className='sub-nav__spacer'>
                <div className='container-fluid sub-nav'>
                    <div className='row'>
                        {subNavEntries.map((entry, i) =>
                            <SubNavEntry
                                {...entry}
                                first={i === 0}
                                selected={this.props.selected === entry.key}
                                onClick={() => this.props.subnavigate(entry.key)}
                            />)
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default SubNav;
