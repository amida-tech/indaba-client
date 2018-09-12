import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
            <div className='sub-nav'>
                {subNavEntries.map((entry, i) => <SubNavEntry
                    {...entry}
                    first={i === 0}
                    selected={this.props.selected === entry.key}
                    onClick={() => this.props.subnavigate(entry.key)}
                />)
                }
            </div>
        );
    }
}

SubNav.propTypes = {
    vocab: PropTypes.object.isRequired,
    subnavigate: PropTypes.func.isRequired,
    selected: PropTypes.string.isRequired,
};

export default SubNav;
