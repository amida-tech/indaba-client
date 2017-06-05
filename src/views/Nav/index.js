import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Box } from 'grommet';


class NavContainer extends Component {
    render() {
        return (
            <nav className='nav'>
                <Box
                  justify='between'>
                    <div>
                        <div className=''></div>
                    </div>
                </Box>
            </nav>
        );
    }
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(NavContainer);
