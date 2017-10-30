import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { Button } from 'grommet';
import { Icon } from 'react-fa';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

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
                <ToastContainer
                    className='primary-nav__toast'
                    position='top-right'
                    type='default'
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    pauseOnHover />

                    <div className='primary-nav__item'>
                    <div className='primary-nav__item-logo'>
                        <Link to={'/task'}>
                            <img src="/src/assets/indaba-logo-white.svg"
                                className="primary-nav__indaba-logo"/>
                        </Link>
                    </div>
                        <Link className='primary-nav__item-nav' to='/project'>
                            {this.props.vocab.PROJECT.PROJECTS}
                        </Link>
                        <Link className='primary-nav__item-nav' to='/users'>
                            {this.props.vocab.COMMON.ALL_USERS}
                        </Link>
                        <Link className='primary-nav__item-nav' to='/subjects'>
                            {this.props.vocab.COMMON.ALL_SUBJECTS}
                        </Link>
                        <Button
                            className={'primary-nav__item-nav primary-nav__item-nav--button'}
                            label={this.props.vocab.COMMON.CREATE}
                            onClick={() => this.props.actions.showCreateProject(true)}/>
                    </div>
                        <div className='primary-nav__right-side'>
                            <Link className='primary-nav__logout'
                                onClick={() => this.props.actions.logOut()}
                                to='/login'>
                                {this.props.vocab.COMMON.LOG_OUT}
                            </Link>
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
