import React, { Component } from 'react';

class PMAllSubjects extends Component {
    render() {
        return (
            <div className='pm-all-subjects'>
                {this.props.subjects.map(subject =>
                    <div className='pm-all-subjects__subject'
                        key={subject.id}>
                        {subject.name}
                    </div>,
                )}
            </div>
        );
    }
}

export default PMAllSubjects;
