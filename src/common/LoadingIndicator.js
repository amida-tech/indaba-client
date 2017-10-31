import React, { Component } from 'react';
import ParticlesBackground from '../plugins/components/ParticlesBackground';

class LoadingIndicator extends Component {
    render() {
        return(
            <div className="loading-indicator">
                <div className="loading-indicator__content">
                    <i className="loading-indicator__spinner"></i>
                    <p className="loading-indicator__text">
                        {this.props.vocab.getIn(['COMMON', 'LOADING'])}
                    </p>
                </div>
                <ParticlesBackground/>
            </div>
        );
    }
}

export default LoadingIndicator;