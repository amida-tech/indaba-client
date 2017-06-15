import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, SearchInput } from 'grommet';
import IonIcon from 'react-ionicons';

class SubjectList extends Component {
    constructor(props) {
        super(props);
        this.filter = this.filter.bind(this);
    }
    filter(subject) {
        return subject.toLowerCase().includes(this.props.query.toLowerCase());
    }
    render() {
        return (
            <div>
                {this.props.subjects.filter(this.filter).map(subject =>
                    <div className='subject-list-entry'
                        key={subject}>
                        <div className='subject-list-entry__name'>
                            {subject}
                        </div>
                        <IonIcon
                            icon='ion-android-delete'
                            className='subject-list-entry__delete'/>
                    </div>)
                }
            </div>);
    }
}

SubjectList.propTypes = {
    filter: PropTypes.string.isRequired,
    subjects: PropTypes.arrayOf(PropTypes.string).isRequired,
};

class Subjects extends Component {
    constructor(props) {
        super(props);
        this.state = { query: '' };
    }
    render() {
        return (
            <div className='subjects-tab'>
                <Button
                    label={this.props.vocab.PROJECT.ADD_SUBJECT}
                    primary/>
                <hr className='divider' />
                <SearchInput onDOMChange={evt => this.setState({ query: evt.target.value })}/>
                <SubjectList subjects={this.props.subjects} query={this.state.query}/>
            </div>);
    }
}

Subjects.propTypes = {
    vocab: PropTypes.object.isRequired,
    subject: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Subjects;
