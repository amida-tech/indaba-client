import React, { Component } from 'react';

class AmidaFooter extends Component {
    render() {
        return (
            <div className='amida-footer'>
                <div className='amida-footer__footer-title'>
                    Powered by Amida
                </div>
                <img src="/src/assets/indaba-SM-green.svg"
                    className="amida-footer__indaba-service-mark"/>
            </div>
        );
    }
}
export default AmidaFooter;
