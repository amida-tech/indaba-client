import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, ListItem, Box, Button, TextInput, CheckBox, Select } from 'grommet';

import TaskStatus from '../../../../utils/TaskStatus';

class FlagSidebar extends Component {
    constructor(props) {
        super(props);
        const issues = props.survey.filter(question => question.flag === true);
        this.state = {
            flags: issues,
            displayed: issues.length > 0 ? issues[0].flagHistory : null,
            notifyUser: 0,
            notifyUsername: props.user.users[0].name,
        }
        this.handleFlagSelect = this.handleFlagSelect.bind(this);
        this.handleNotifyUserChange = this.handleNotifyUserChange.bind(this);
    }

    handleFlagSelect(event){
        this.setState({ displayed: this.props.survey[event].flagHistory });
    }

    handleNotifyUserChange(event){
        this.setState( {
            notifyUser: event.option.value,
            notifyUsername: event.option.label,
        });
    }

    render() {
        return (
            <Box className='flag-sidebar'>
                <span className='flag-sidebar__title'>
                    {this.props.vocab.PROJECT.FLAGS}
                </span>
                <div className='flag-sidebar__head-row'>
                    {this.state.flags.length}{this.props.vocab.PROJECT.FLAGS_REPORTED}
                    <Button className='flag-sidebar__head-row--button'
                        primary={true}
                        label={this.props.vocab.PROJECT.ADD_STAGE} />
                </div>
                <div className='flag-sidebar__review-container'>
                    <List>
                        {this.props.survey.map((q, i) => {
                            return (this.state.flags.includes(q)) ?
                                <ListItem key={'listitem'+q+i}
                                    onClick={this.handleFlagSelect.bind(this, i)}>
                                    {this.props.vocab.PROJECT.QUESTION_ + (i+1) }
                                </ListItem> :
                                <ListItem key={'listitem'+q+i}
                                    className='flag-sidebar__questions--inactive'>
                                    {this.props.vocab.PROJECT.QUESTION_ + (i+1) }
                                </ListItem>
                        })}
                    </List>
                    <div className='flag-sidebar__review-controls'>
                        {this.state.displayed && this.state.displayed.map((reply, i) => {
                            return (
                                <div className='flag-sidebar__review-comment'
                                    key={'flag-comment'+i}>
                                    <div className='flag-sidebar__review-comment--time'>
                                        {TaskStatus.formatDateTime(reply.timestamp)}
                                    </div>
                                    <div className='flag-sidebar__review-comment--comment'>
                                        {reply.comment}
                                    </div>
                                    <div className='flag-sidebar__review-comment--signature'>
                                        –{this.props.user.users[reply.userId].name}
                                    </div>
                                </div>
                            )
                        })}
                        <TextInput
                            placeHolder={this.props.vocab.PROJECT.REPLY} />
                        <CheckBox className='flag-sidebar__checkbox'
                            label={this.props.vocab.PROJECT.MARK_RESOLVED} />
                        <div className='flag-sidebar__notify'>
                            {this.props.vocab.PROJECT.NOTIFY_USER}
                            <Select
                                value={this.state.notifyUsername}
                                options={this.props.user.users.map(user => ({
                                    label: user.name,
                                    value: user.id,
                                }))}
                                onChange={this.handleNotifyUserChange} />
                        </div>
                    </div>
                </div>
            </Box>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps)(FlagSidebar);
