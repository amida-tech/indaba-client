import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Box, Button } from 'grommet';
import { Icon } from 'react-fa';

import CreateNewProject from './CreateNewProject';


class PrimaryNavContainer extends Component {
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
                  direction='row'
                  align='center'
                  full="vertical">
                    <Box direction='row' align='baseline'>
                        <div className='primary-nav__item'>
                            <Link to="/task">
                                <img src="/src/assets/indaba_logo.svg"
                                    className="primary-nav__indaba-logo"/>
                            </Link>
                        </div>
                        <Link className='primary-nav__item primary-nav__item' to='/project'>
                            {this.props.vocab.PROJECT.PROJECTS}
                        </Link>
                        <Link className='primary-nav__item' to='/users'>
                            {this.props.vocab.COMMON.ALL_USERS}
                        </Link>
                        <Link className='primary-nav__item' to='/subjects'>
                            {this.props.vocab.COMMON.ALL_SUBJECTS}
                        </Link>
                        <Button
                            className={'primary-nav__item primary-nav__button '
                                + 'primary-nav__item'}
                            label={this.props.vocab.COMMON.CREATE}
                            onClick={() => this.setState({ showCreateNewProject: true })}/>
                    </Box>
                    <Box className='primary-nav__icon' direction='row' align='baseline'>
                        <Icon className='primary-nav__envelope' name="envelope-o" size="2x" />
                        <Icon className='primary-nav__user' name="user-o" size="2x" />
                    </Box>
                </Box>
            </nav>
        );
    }
}

const mapStateToProps = state => ({
    vocab: state.settings.language.vocabulary,
});

export default connect(mapStateToProps)(PrimaryNavContainer);
