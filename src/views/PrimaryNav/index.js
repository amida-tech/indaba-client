import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Button } from 'grommet';
import { Icon } from 'react-fa';
import { get, has } from 'lodash';

import * as actions from '../../common/actions/navActions';
import { getUsers, getProfile } from '../../common/actions/userActions';
import { getProjects } from '../../common/actions/projectActions';
import { renderName } from '../../utils/User';
import CreateNewProject from './CreateNewProject';

import IndabaLogoWhite from '../../assets/indaba-logo-white.svg';

class PrimaryNavContainer extends Component {
    componentWillMount() {
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
                    onCancel={() => this.props.actions.showCreateProject(false)}/>}

                <div className='primary-nav__left'>
                    <NavLink to={isProjectManager ? '/project' : '/task'} exact>
                        <img src={IndabaLogoWhite}
                            className="primary-nav__indaba-logo"/>
                    </NavLink>
                    <NavLink className='primary-nav__item-nav'
                        activeClassName='primary-nav__item-nav--active'
                        to='/task' exact>
                        {this.props.vocab.COMMON.MY_TASKS}
                    </NavLink>
                    {isProjectManager &&
                    <NavLink className='primary-nav__item-nav'
                        activeClassName='primary-nav__item-nav--active'
                        to='/project' exact>
                        {this.props.vocab.PROJECT.PROJECTS}
                    </NavLink>}
                    {isProjectManager &&
                    <NavLink className='primary-nav__item-nav'
                        activeClassName='primary-nav__item-nav--active'
                        to='/users'>
                        {this.props.vocab.COMMON.ALL_USERS}
                    </NavLink>}
                    {isProjectManager &&
                    <NavLink className='primary-nav__item-nav'
                        activeClassName='primary-nav__item-nav--active'
                        to='/subjects'>
                        {this.props.vocab.COMMON.ALL_SUBJECTS}
                    </NavLink>}
                    {isProjectManager &&
                    <Button
                        className={'primary-nav__item-nav primary-nav__button'}
                        label={this.props.vocab.COMMON.CREATE}
                        onClick={() => this.props.actions.showCreateProject(true)}/>}
                </div>
                <div className='primary-nav__right'>
                    <div className='primary-nav__welcome'>
                        {`${this.props.vocab.COMMON.WELCOME_} ${renderName(get(this.props, 'user.profile'))}`}
                    </div>
                    <NavLink className='primary-nav__link'
                        to='/messages'>
                        <Icon className='primary-nav__envelope'
                            name='envelope-o'
                            size='2x' />
                    </NavLink>
                    <NavLink className='primary-nav__link'
                        to='/profile'>
                        <Icon className='primary-nav__user'
                            name='user-o'
                            size='2x' />
                    </NavLink>
                    <NavLink className='primary-nav__logout'
                        onClick={() => this.props.actions.logOut('')}
                        to='/login'>
                        {this.props.vocab.COMMON.LOG_OUT}
                    </NavLink>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = state => {
    return ({
    nav: state.nav,
    user: state.user,
    vocab: state.settings.language.vocabulary,
    ui: state.nav.ui,
    routing: state.routing,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, actions,
        { getProfile, getUsers, getProjects }), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PrimaryNavContainer);
