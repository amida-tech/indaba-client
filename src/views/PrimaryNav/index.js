import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
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
                    <Button
                        className={'primary-nav__item-nav primary-nav__button'}
                        label={this.props.vocab.COMMON.CREATE}
                        onClick={() => this.props.actions.showCreateProject(true)}/>}
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
                        onClick={() => this.props.actions.logOut()}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(PrimaryNavContainer);
