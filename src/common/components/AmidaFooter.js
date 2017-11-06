import React, { Component } from 'react';
import { Footer } from 'grommet';

class AmidaFooter extends Component {
    render() {
        return (
            <Footer justify='between'
                className='amida-footer'>
                <p className='amida-footer__footer-title'>
                    Powered By Amida
                </p>
            </Footer>
        );
    }
}
export default AmidaFooter;
