import React, { Component } from 'react';
import { Box, Button } from 'grommet';

class AddSubjects extends Component {
    render() {
        return <div>
            &lt;Summary /&gt;
            <hr className='divider'/>
            <Box direction='row' justify='end'
                pad={{ vertical: 'small', horizontal: 'medium' }}>
                <Button label='Import Subjects' />
            </Box>
        </div>;
    }
}

export default AddSubjects;
