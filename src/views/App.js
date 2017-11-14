import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import PrimaryNavContainer from './PrimaryNav';
import SecondaryNavContainer from './SecondaryNav';
import AmidaFooter from '../common/components/AmidaFooter';

class App extends Component {
    render() {
        return (
            <div className='app'>
                {this.props.location.pathname === '/login' ?
                    <SecondaryNavContainer /> :
                    <PrimaryNavContainer /> }
                <div className='main-body'>
                    {this.props.children}
                </div>
                {
                    this.props.location.pathname !== '/create-new-project' &&
                    <AmidaFooter/>
                }
                <ToastContainer
                    className='app__toast'
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
