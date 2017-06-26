import React, { Component } from 'react';
import { Box, Button } from 'grommet';

class FlagHeader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Box className='flag-header'>
                <span className='flag-header__title'>
                    {this.props.vocab.PROJECT.FLAGS}
                </span>
                <div className='flag-header__info'>
                    {this.props.ui.flagSidebar.flags.length}{this.props.vocab.PROJECT._FLAGS_REPORTED}
                    <Button className='flag-header__info flag-header__info-button'
                        primary={true}
                        label={this.props.vocab.PROJECT.ADD_STAGE} />
                </div>
            </Box>
        )
    }
}

export default FlagHeader;
