import React, { Component } from 'react';
import { Box, Button, TextInput } from 'grommet';
import IonIcon from 'react-ionicons';

class SubjectListEntry extends Component {

}

class AddSubjectControl extends Component {
    render() {
        return <div>
            <Box direction='row' justify='between'>
                <div>Subjects are units of analysis.
                    For example, cities, programs, or companies.
                    Separate subjects with a comma.</div>
                <div>Actions</div>
            </Box>
            <Box><TextInput /><IonIcon icon='ion-ios-plus'/></Box>
        </div>;
    }
}

class AddSubjects extends Component {
    render() {
        return <div>
            &lt;Summary /&gt;
            <hr className='divider'/>
            <Box direction='row' justify='end'
                pad={{ vertical: 'small', horizontal: 'medium' }}>
                <Button label='Import Subjects' />
            </Box>
            <hr className='divider'/>
            <p>Add survey subjects or use the import manager to add subjects
                from a previous project.</p>
            <AddSubjectControl />
        </div>;
    }
}

export default AddSubjects;
