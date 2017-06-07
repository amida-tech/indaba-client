import React, { Component } from 'react';
import { Footer, Button, Box } from 'grommet';

class WizardFooter extends Component {
    render() {
        return (<Footer justify='between'>
            <div>
                <Button label='Go Back' />
            </div>
            <Box direction='row' pad={{ between: 'small' }}>
                <Button label='Cancel' />
                <Button label='Skip This Step' />
                <Button primary label='Continue' />
            </Box>
        </Footer>);
    }
}

export default WizardFooter;
