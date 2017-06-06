import React, { Component } from 'react';
import { Footer, Button, Box } from 'grommet';

class SurveyEditorStep extends Component {
    render() {
        return (<div>
            &lt;Survey Editor /&gt;
            <Footer justify='between'>
                <div>
                    <Button label='Go Back' />
                </div>
                <Box direction='row' pad={{ between: 'small' }}>
                    <Button label='Cancel' />
                    <Button label='Skip This Step' />
                    <Button primary label='Continue' />
                </Box>
            </Footer>
        </div>);
    }
}

export default SurveyEditorStep;
