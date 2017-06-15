import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, SearchInput } from 'grommet';

class Users extends Component {
    constructor(props) {
        super(props);

        this.state = {
            query: '',
        };
    }
    render() {
        return (
            <div className='users-tab'>
                <Button
                    label={this.props.vocab.PROJECT.ADD_USER}
                    primary/>
                <Button
                    label={this.props.vocab.PROJECT.ADD_USER_GROUP}
                    primary/>
                <hr className='divider'/>
                <SearchInput
                    onDOMChange={evt => this.setState({ query: evt.target.value })}/>
            </div>
        );
    }
}

Users.propTypes = {
    vocab: PropTypes.object.isRequired,
};

export default Users;
