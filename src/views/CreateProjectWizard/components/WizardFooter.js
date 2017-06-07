import React, { Component } from 'react';
import { Footer, Button, Box } from 'grommet';

class WizardFooter extends Component {
    render() {
        return (<Footer justify='between'>
            <div>
                <Button label='Go Back' onClick={this.props.onBack}/>
            </div>
            <Box direction='row' pad={{ between: 'small' }}>
                <Button label='Cancel' onClick={this.props.onCancel}/>
                <Button label='Skip This Step' onClick={this.props.onSkip}/>
                <Button primary label='Continue' onClick={this.props.onContinue}/>
            </Box>
        </Footer>);
    }
}

export default WizardFooter;
