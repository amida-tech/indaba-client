import React, { Component } from 'react';
import Box from 'grommet/components/Box';

class FlagControls extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Box className='flag-controls'>
                <CheckBox className='flag-controls__checkbox'
                    label={this.props.vocab.PROJECT.MARK_RESOLVED}
                    checked={this.props.resolved}
                    onChange={this.handleMarkResolved} />
                <div className='flag-controls__notify'>
                    {this.props.vocab.PROJECT.NOTIFY_USER}
                    <Select
                        value={this.props.notifyUsername}
                        options={this.props.user.users.map(user => ({
                            label: user.name,
                            value: user.id,
                        }))}
                        onChange={this.handleNotifyUserChange} />
                </div>
                <div className='flag-controls__button-group'>
                    <Button className='flag-controls__button-group-cancel'
                        primary={false}
                        label={this.props.vocab.COMMON.CANCEL}
                        onClick={this.onCancel} />
                    <Button className='flag-controls__button-group-send'
                        primary={true}
                        label={this.props.vocab.COMMON.SEND}
                        onClick={this.onSend} />
                </div>
            </Box>
        )
    }
}

export default FlagControls;
