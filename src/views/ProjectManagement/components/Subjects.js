import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'grommet';

class Subjects extends Component {
    render() {
        return (
            <div className='subjects-tab'>
                <Button
                    label={this.props.vocab.PROJECT.ADD_SUBJECT}
                    primary/>
            </div>);
    }
}

Subjects.propTypes = {
    vocab: PropTypes.object.isRequired,
};

export default Subjects;
