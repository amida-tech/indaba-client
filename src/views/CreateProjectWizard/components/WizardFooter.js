import React, { Component } from 'react';

class WizardFooter extends Component {
    render() {
        return (
            <div className='wizard-footer'>
                <div>
                    <button className={`wizard-footer__button wizard-footer__button${
                        this.props.step === 0 ? '--disabled' : '--back'}`}
                    onClick={this.props.onBack}>
                        <span>{this.props.vocab.COMMON.GO_BACK}</span>
                    </button>
                </div>
                <div>
                    <button className='wizard-footer__button wizard-footer__button--cancel'
                        onClick={this.props.onCancel}>
                        <span>{this.props.vocab.COMMON.CANCEL}</span>
                    </button>
                    <button className='wizard-footer__button wizard-footer__button--skip'
                        onClick={this.props.onSkip}>
                        <span>{this.props.vocab.COMMON.SKIP_THIS_STEP}</span>
                    </button>
                    <button className='wizard-footer__button wizard-footer__button--continue'
                        onClick={this.props.onContinue}>
                        <span>
                            {this.props.finalStep
                                ? this.props.vocab.PROJECT.COMPLETE_PROJECT
                                : this.props.vocab.COMMON.CONTINUE}
                        </span>
                    </button>
                </div>
            </div>
        );
    }
}

export default WizardFooter;
