import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FlagHeader extends Component {
    render() {
        return (
            <div className='flag-header'>
                <span className='flag-header__title'>
                    {this.props.vocab.PROJECT.FLAGS}
                </span>
                <div className='flag-header__info'>
                    {this.props.flagCount}{this.props.vocab.PROJECT._FLAGS_REPORTED}
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
    flagCount: PropTypes.number,
    vocab: PropTypes.object.isRequired,
};

export default FlagHeader;
