import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { Box, Button } from 'grommet';
import { Icon } from 'react-fa';

import * as actions from '../../common/actions/navActions';
import { getUsers, getProfile } from '../../common/actions/userActions';
import { getProjects } from '../../common/actions/projectActions';
import CreateNewProject from './CreateNewProject';


class PrimaryNavContainer extends Component {
    componentWillMount() {
        if (this.props.nav.ui.checkBackend) {
            this.props.actions.getProfile(this.props.vocab.ERROR);
            this.props.actions.getUsers(this.props.vocab.ERROR);
            this.props.actions.toggleCheckBackend();
        }
    }

    render() {
        return (
            <nav className='primary-nav'>
                {this.props.ui.showCreateProject &&
                <CreateNewProject vocab={this.props.vocab}
                    onCancel={() => this.props.actions.showCreateProject(false)}/>}
                <Box
                  justify='between'
                  direction='row'
                  align='center'
                  full="vertical">
                    <Box direction='row' align='baseline'>
                        <div className='primary-nav__item'>
                            <Link to={'/task'}>
                                <img src="/src/assets/indaba_logo.svg"
                                    className="primary-nav__indaba-logo"/>
                            </Link>
                        </div>
                        <Link className='primary-nav__item' to='/project'>
                            {this.props.vocab.PROJECT.PROJECTS}
                        </Link>
                        <Link className='primary-nav__item' to='/users'>
                            {this.props.vocab.COMMON.ALL_USERS}
                        </Link>
                        <Link className='primary-nav__item' to='/subjects'>
                            {this.props.vocab.COMMON.ALL_SUBJECTS}
                        </Link>
                        <Button
                            className={'primary-nav__item primary-nav__button '}
                            label={this.props.vocab.COMMON.CREATE}
                            onClick={() => this.props.actions.showCreateProject(true)}/>
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
    nav: state.nav,
    user: state.user,
    vocab: state.settings.language.vocabulary,
    ui: state.nav.ui,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, actions,
        { getProfile, getUsers, getProjects }), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PrimaryNavContainer);
