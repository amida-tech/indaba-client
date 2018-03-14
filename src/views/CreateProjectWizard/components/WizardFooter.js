import React, { Component } from 'react';
import { Footer, Button, Box } from 'grommet';

class WizardFooter extends Component {
    render() {
        return (
            <Footer justify='between'>
                <div className='wizard-footer'>
                    <div>
                        <Button className='wizard-footer__button wizard-footer__button--back'
                            label={this.props.vocab.COMMON.GO_BACK}
                            onClick={this.props.onBack}/>
                    </div>
                    <Box direction='row'
                        pad={{ between: 'small' }}>
                        <Button
                            className='wizard-footer__button wizard-footer__button--cancel'
                            label={this.props.vocab.COMMON.CANCEL}
                            onClick={this.props.onCancel}/>
                        <Button
                            className='wizard-footer__button wizard-footer__button--skip'
                            label={this.props.vocab.COMMON.SKIP_THIS_STEP}
                            onClick={this.props.onSkip}/>
                        <Button
                            className='wizard-footer__button wizard-footer__button--continue'
                            label={this.props.finalStep ?
                                this.props.vocab.PROJECT.COMPLETE_PROJECT :
                                this.props.vocab.COMMON.CONTINUE}
                            onClick={this.props.onContinue}/>
                    </Box>
                </div>
            </Footer>);
    }
}

export default WizardFooter;
