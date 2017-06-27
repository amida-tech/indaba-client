import React, { Component } from 'react';
import { Box, Button } from 'grommet';
import PropTypes from 'prop-types';

class FlagHeader extends Component {
    render() {
        return (
            <Box className='flag-header'>
                <span className='flag-header__title'>
                    {this.props.vocab.PROJECT.FLAGS}
                </span>
                <div className='flag-header__info'>
                    {this.props.ui.flags.length}{this.props.vocab.PROJECT._FLAGS_REPORTED}
                    <Button className='flag-header__info flag-header__info-button'
                        primary={true}
                        label={this.props.vocab.PROJECT.ADD_STAGE} />
                </div>
            </Box>
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
