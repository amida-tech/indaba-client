import React, { Component } from 'react';
import { Footer, Button, Box } from 'grommet';

class WizardFooter extends Component {
    render() {
        return (<Footer justify='between'>
            <div>
                <Button label='Go Back' onClick={this.props.onBack}/>
            </div>
            <Box direction='row' pad={{ between: 'small' }}>
                <Button label={this.props.vocab.COMMON.CANCEL}
                    onClick={this.props.onCancel}/>
                <Button label={this.props.vocab.COMMON.SKIP_THIS_STEP}
                    onClick={this.props.onSkip}/>
                <Button primary
                    label={this.props.finalStep ?
                        this.props.vocab.PROJECT.COMPLETE_PROJECT :
                        this.props.vocab.COMMON.CONTINUE}
                    onClick={this.props.onContinue}/>
            </Box>
        </Footer>);
    }
}

export default WizardFooter;
