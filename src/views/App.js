import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { css } from 'glamor';

import PrimaryNavContainer from './PrimaryNav';
import SecondaryNavContainer from './SecondaryNav';
import { SECONDARY } from './SecondaryNav/constants';
import AmidaFooter from '../common/components/AmidaFooter';
import routes from '../routes';

class App extends Component {
    render() { // Check if react-router doesn't have something for this.
        console.log('App');
        console.log(this.props);
        const subRoot = this.props.location.pathname.substring(0, this.props.location.pathname.indexOf('/', 2)) ||
            this.props.location.pathname;
        return (
            <div className='app'>
                {SECONDARY.includes(subRoot) ?
                    <SecondaryNavContainer /> :
                    <PrimaryNavContainer /> }
                <div className='main-body'>
                    {routes}
                </div>
                {
                    this.props.location.pathname !== '/create-new-project' &&
                    <AmidaFooter/>
                }
                <ToastContainer
                    progressClassName={css({ background: '#4eb276' })}
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

export default App;
