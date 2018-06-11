import React, { Component } from 'react';
import PropTypes from 'prop-types';

import IndabaSMGreen from '../../assets/indaba-SM-green.svg';

class AmidaFooter extends Component {
    render() {
        return (
            <div className='amida-footer'>
                <div className='amida-footer__version'>
                    {this.props.versionText + this.props.versionNumber}
                </div>
                <div className='amida-footer__footer-title'>
                    <span className='amida-footer__footer-text'>
                        {this.props.footerText}
                    </span>
                    <img src={IndabaSMGreen}
                        className="amida-footer__indaba-service-mark"/>
                </div>
            </div>
        );
    }
}

AmidaFooter.propTypes = {
    footerText: PropTypes.string.isRequired,
    versionText: PropTypes.string.isRequired,
    versionNumber: PropTypes.string.isRequired,
};

export default AmidaFooter;
