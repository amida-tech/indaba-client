import React, { Component } from 'react';
import { Footer } from 'grommet';
import Title from 'grommet/components/Title';

class AmidaFooter extends Component {
    render() {
        return (
            <Footer justify='between'
                className='amida-footer'>
                <Title className='amida-footer__footer-title'>
                    Powered By Amida
                </Title>
                <img src="/src/assets/indaba-SM-white.svg"
                    className="amida-footer__indaba-service-mark"/>
            </Footer>
        );
    }
}
export default AmidaFooter;
