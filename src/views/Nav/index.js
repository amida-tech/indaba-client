import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Box, Button } from 'grommet';


class NavContainer extends Component {
    render() {
        return (
            <nav className='nav'>
                <Box
                  justify='between'
                  direction='row'>
                    <Box direction='row'>
                        <div className='nav-indaba-logo'>|indaba-icon|</div>
                        <Link to='/project'>Project</Link>
                        <Link to='/users'></Link>
                        <Link to='/subjects'></Link>
                        <Button>Create</Button>
                    </Box>
                    <Box direction='row'>
                        <div className='nav-mail'>|envelope-icon|</div>
                        <div className='nav-account'>|face-icon|</div>
                    </Box>
                </Box>
            </nav>
        );
    }
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(NavContainer);
