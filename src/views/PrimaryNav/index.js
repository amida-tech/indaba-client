import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Box, Button } from 'grommet';
import CreateNewProject from './CreateNewProject';

class NavContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { showCreateNewProject: false };
    }
    render() {
        return (
            <nav className='primary-nav'>
                {this.state.showCreateNewProject &&
                <CreateNewProject vocab={this.props.vocab}
                    onCancel={() => this.setState({ showCreateNewProject: false })}/>}
                <Box
                  justify='between'
                  direction='row'>
                    <Box direction='row'>
                        <div className='primary-nav__indaba-logo primary-nav__item'>|indaba-icon|</div>
                        <Link className='primary-nav__item' to='/project'>{this.props.vocab.PROJECT.PROJECTS}</Link>
                        <Link className='primary-nav__item' to='/users'>{this.props.vocab.COMMON.ALL_USERS}</Link>
                        <Link className='primary-nav__item' to='/subjects'>{this.props.vocab.COMMON.ALL_SUBJECTS}</Link>
                        <Button className='primary-nav__item primary-nav__button' label={this.props.vocab.COMMON.CREATE}
                            onClick={() => this.setState({ showCreateNewProject: true })}/>
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
