import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { Icon } from 'react-fa';
import { get, has } from 'lodash';
import cookie from 'react-cookies';
import { push } from 'react-router-redux';

import * as actions from '../../common/actions/navActions';
import { getUsers, getProfile } from '../../common/actions/userActions';
import { getProjects } from '../../common/actions/projectActions';
import { renderName } from '../../utils/User';
import CreateNewProject from './CreateNewProject';

import IndabaLogoWhite from '../../assets/indaba-logo-white.svg';

class PrimaryNavContainer extends Component {
    constructor(props) {
        super(props);

        this.handleLogOut = this.handleLogOut.bind(this);
        this.handleShowCreateProject = this.handleShowCreateProject.bind(this);
    }

    handleLogOut() {
        this.props.actions.logOut('');
    }

    handleShowCreateProject() {
        this.props.actions.showCreateProject(true);
    }

    componentWillMount() {
        if (cookie.load('indaba-auth') === undefined) {
            this.props.redirectToLogin();
        }
        if (!has(this.props.user.profile, 'roleID')) {
            this.props.actions.getProfile(this.props.vocab.ERROR);
        }
        if (this.props.nav.ui.checkBackend) {
            this.props.actions.getUsers(this.props.vocab.ERROR);
            this.props.actions.toggleCheckBackend();
        }
    }

    render() {
        const isProjectManager = ((this.props.user.profile.roleID === 2) ||
            (this.props.user.profile.roleID === 1));
        return (
            <nav className='primary-nav'>
                {this.props.ui.showCreateProject &&
                <CreateNewProject vocab={this.props.vocab}
                    showCreateProject={this.props.actions.showCreateProject}
                    goToNewProject={this.props.goToNewProject}/>}

                <div className='primary-nav__left'>
                    <Link to={isProjectManager ? '/project' : '/task'}>
                        <img src={IndabaLogoWhite}
                            className="primary-nav__indaba-logo"/>
                    </Link>

                    <Link className='primary-nav__item-nav' to='/task'
                        activeClassName='primary-nav__item-nav--active'>
                        {this.props.vocab.COMMON.MY_TASKS}
                    </Link>
                    {isProjectManager &&
                    <Link className='primary-nav__item-nav' to='/project'
                        activeClassName='primary-nav__item-nav--active'>
                        {this.props.vocab.PROJECT.PROJECTS}
                    </Link>}
                    {isProjectManager &&
                    <Link className='primary-nav__item-nav' to='/users'
                        activeClassName='primary-nav__item-nav--active'>
                        {this.props.vocab.COMMON.ALL_USERS}
                    </Link>}
                    {isProjectManager &&
                    <Link className='primary-nav__item-nav' to='/subjects'
                        activeClassName='primary-nav__item-nav--active'>
                        {this.props.vocab.COMMON.ALL_SUBJECTS}
                    </Link>}
                    {isProjectManager &&
                        <button className='primary-nav__item-nav primary-nav__button'
                            onClick={this.handleShowCreateProject}>
                            <span>{this.props.vocab.COMMON.CREATE}</span>
                        </button>}
                </div>
                <div className='primary-nav__right'>
                    <div className='primary-nav__welcome'>
                        {`${this.props.vocab.COMMON.WELCOME_} ${renderName(get(this.props, 'user.profile'))}`}
                    </div>
                    <Link className='primary-nav__link'
                        to='/messages'>
                        <Icon className='primary-nav__envelope'
                            name='envelope-o'
                            size='2x' />
                    </Link>
                    <Link className='primary-nav__link'
                        to='/profile'>
                        <Icon className='primary-nav__user'
                            name='user-o'
                            size='2x' />
                    </Link>
                    <Link className='primary-nav__logout'
                        onClick={this.handleLogOut}
                        to='/login'>
                        {this.props.vocab.COMMON.LOG_OUT}
                    </Link>
                </div>
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
    redirectToLogin: () => dispatch(push('/login')),
    goToNewProject: () => dispatch(push('/create-new-project')),
});

export default connect(mapStateToProps, mapDispatchToProps)(PrimaryNavContainer);
