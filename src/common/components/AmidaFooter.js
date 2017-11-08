import React, { Component } from 'react';
import Title from 'grommet/components/Title';

class AmidaFooter extends Component {
    render() {
        return (
            <div className='amida-footer__container'>
                    <div className='amida-footer__container-block'>
                    <Title className='amida-footer__footer-title'>
                        Powered by Amida
                    </Title>
                    <img src="/src/assets/indaba-SM-green.svg"
                        className="amida-footer__indaba-service-mark"/>
                </div>
            </div>
        );
    }
}
export default AmidaFooter;
