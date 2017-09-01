import React, { Component } from 'react';
import { Box } from 'grommet';

class SecondaryNavContainer extends Component {
    render() {
        return (
            <nav className='primary-nav'>
                <Box
                  justify='between'
                  direction='row'
                  align='center'
                  full="vertical">
                    <Box direction='row' align='baseline'>
                        <div className='primary-nav__item'>
                            <img src="/src/assets/indaba_logo.svg"
                                className="primary-nav__indaba-logo"/>
                        </div>
                    </Box>
                </Box>
            </nav>
        );
    }
}

export default SecondaryNavContainer;
