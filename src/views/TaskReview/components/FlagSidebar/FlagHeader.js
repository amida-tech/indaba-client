import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { every, sumBy } from 'lodash';

class FlagHeader extends Component {
    render() {
        const flagCount = sumBy(this.props.ui.flags, (flag) => {
            return every(flag.discussion, discuss => discuss.isResolve) ? 0 : 1;
        });
        return (
            <div className='flag-header'>
                <span className='flag-header__title'>
                    {this.props.vocab.PROJECT.FLAGS}
                </span>
                <div className='flag-header__info'>
                    {flagCount}{this.props.vocab.PROJECT._FLAGS_REPORTED}
                </div>
            </div>
        );
    }
}

FlagHeader.propTypes = {
    ui: PropTypes.shape({
        flags: PropTypes.array,
        flagSideBar: PropTypes.object,
    }).isRequired,
    vocab: PropTypes.object.isRequired,
};

export default FlagHeader;
