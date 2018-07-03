import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import cookie from 'react-cookies';
import { get } from 'lodash';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { checkProtection } from '../common/actions/navActions';
import PrimaryNavContainer from './PrimaryNav';
import SecondaryNavContainer from './SecondaryNav';
import { SECONDARY } from './SecondaryNav/constants';

import AmidaFooter from '../common/components/AmidaFooter';

class App extends Component {
    componentWillMount() {
        if (this.props.location.pathname === '/') {
            this.props.actions.checkProtection(this.props.profile);
            if (get(this.props, 'profile.roleID') === 2 || cookie.load('indaba-roleID') === '2') {
                this.props.redirectToPMDash();
            }
        }
    }

    render() { // Check if react-router doesn't have something for this.
        const subRoot = this.props.location.pathname.substring(0, this.props.location.pathname.indexOf('/', 2)) ||
            this.props.location.pathname;
        return (
            <div className='app'>
                {SECONDARY.includes(subRoot) ?
                    <SecondaryNavContainer /> :
                    <PrimaryNavContainer /> }
                <div className='main-body'>
                    {this.props.children}
                </div>
                {
                    this.props.location.pathname !== '/create-new-project' &&
                    <AmidaFooter
                        versionText={this.props.versionText}
                        footerText={this.props.footerText}/>
                }
                <ToastContainer
                    className='app__toast'
                    progressClassName='toastify__progress'
                    position='top-right'
                    type='default'
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    pauseOnHover />
            </div>

        );
    }
}

const mapStateToProps = store => ({
    profile: store.user.profile,
    versionText: store.settings.language.vocabulary.COMMON.VERSION_,
    footerText: store.settings.language.vocabulary.COMMON.POWERED_BY_AMIDA,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, { checkProtection }), dispatch),
    redirectToPMDash: () => dispatch(push('/project')),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
