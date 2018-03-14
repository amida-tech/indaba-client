import React, { Component } from 'react';

import IndabaSMGreen from '../../assets/indaba-SM-green.svg';

class AmidaFooter extends Component {
    render() {
        return (
            <div className='amida-footer'>
                <div className='amida-footer__footer-title'>
                    Powered by Amida
                </div>
                <img src={IndabaSMGreen}
                    className="amida-footer__indaba-service-mark"/>
            </div>
        );
    }
}
export default AmidaFooter;
