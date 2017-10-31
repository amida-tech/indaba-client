import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import PrimaryNavContainer from './PrimaryNav';


class App extends Component {
    render() {
        return (
            <div>
                {this.props.location.pathname === '/login' ?
                    <PrimaryNavContainer /> :
                    <PrimaryNavContainer /> }
                <div className='main-body'>
                    {this.props.children}
                </div>
                <ToastContainer
                    className='primary-nav__toast'
                    position='top-right'
                    type='default'
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    pauseOnHover />;
            </div>
        );
    }
}

export default App;
