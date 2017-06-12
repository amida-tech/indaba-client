import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Box, Button } from 'grommet';
import CreateNewProject from './CreateNewProject';

class NavContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {showCreateNewProject: false}
    }
    render() {
        return (
            <nav className='nav'>
                {this.state.showCreateNewProject &&
                <CreateNewProject vocab={this.props.vocab}/>}
                <Box
                  justify='between'
                  direction='row'>
                    <Box direction='row'>
                        <div className='nav-indaba-logo'>|indaba-icon|</div>
                        <Link to='/project'>{this.props.vocab.PROJECT.PROJECTS}</Link>
                        <Link to='/users'>{this.props.vocab.COMMON.ALL_USERS}</Link>
                        <Link to='/subjects'>{this.props.vocab.COMMON.ALL_SUBJECTS}</Link>
                        <Button label={this.props.vocab.COMMON.CREATE}
                            onClick={() => this.setState({showCreateNewProject: true})}/>
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

const mapStateToProps = state => ({
    vocab: state.settings.language.vocabulary,
});

export default connect(mapStateToProps)(NavContainer);
