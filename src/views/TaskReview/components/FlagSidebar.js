import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, ListItem, Box, Button, TextInput, CheckBox, Select } from 'grommet';
import { updateFlaggedQuestion } from '../actions';

import TaskStatus from '../../../utils/TaskStatus';

function stateInitializer(props, state) {
    const issues = props.survey.filter(question => question.flag === true);
    return state = {
        survey: props.survey,
        projectId: 0,
        flags: props.survey.filter(question => question.flag === true),
        activeFlag: issues.length > 0 ? issues[0].flagHistory : null,
        activeId: issues.length > 0 ? issues[0].id : null,
        notifyUserId: 0,
        comment: '',
        resolved: false,
        notifyUsername: props.user.users[0].name,
    }
}

class FlagSidebar extends Component {
    componentWillReceiveProps(nextProps) {
        this.setState(stateInitializer(nextProps, this.state));
    }

    constructor(props) {
        super(props);
        this.state = stateInitializer(props, this.state);
        this.handleFlagSelect = this.handleFlagSelect.bind(this);
        this.handleComment = this.handleComment.bind(this);
        this.handleMarkResolved = this.handleMarkResolved.bind(this);
        this.handleNotifyUserChange = this.handleNotifyUserChange.bind(this);
        this.onCancel= this.onCancel.bind(this);
        this.onSend= this.onSend.bind(this);
    }

    handleFlagSelect(event){
        this.setState({
            activeFlag: this.props.survey[event].flagHistory,
            activeId: event,
        });
    }

    handleComment(event){
        this.setState({ comment: event.target.value });
    }

    handleMarkResolved(event){
        this.setState({ resolved: !this.state.resolved });
    }

    handleNotifyUserChange(event){
        this.setState( {
            notifyUserId: event.option.value,
            notifyUsername: event.option.label,
        });
    }

    onCancel(){
        this.setState({
            notifyUserId: 0,
            comment: '',
            resolved: false,
            notifyUsername: this.props.user.users[0].name,
        });
    }

    onSend(){
        // Change project id down the road.
        this.props.updateFlaggedQuestion({
            projectId: this.state.projectId,
            questionId: this.state.activeId,
            assigneeId: this.props.assignee.id,
            notifyUserId: this.state.notifyUserId,
            comment: this.state.comment,
            resolved: this.state.resolved,
            signatureId: this.props.user.currentId,
            timestamp: new Date(),
        });
    }

    render() {
        return (
            <Box className='flag-sidebar'>
                <span className='flag-sidebar__title'>
                    {this.props.vocab.PROJECT.FLAGS}
                </span>
                <div className='flag-sidebar__head-group'>
                    {this.state.flags.length}{this.props.vocab.PROJECT.FLAGS_REPORTED}
                    <Button className='flag-sidebar__head-group-button'
                        primary={true}
                        label={this.props.vocab.PROJECT.ADD_STAGE} />
                </div>
                <div className='flag-sidebar__review-container'>
                    <List className='flag-sidebar__question-list'>
                        {this.state.survey.map((q, i) => {
                            return (this.state.flags.includes(q)) ?
                            // TODO: this could probably go into state over conditionally rendering.
                                <ListItem key={'listitem'+q+i}
                                    className={i === this.state.activeId ?
                                        'flag-sidebar__questions flag-sidebar__questions--selected' : 'flag-sidebar__questions'}
                                    onClick={this.handleFlagSelect.bind(this, i)}>
                                    {this.props.vocab.PROJECT.QUESTION_ + (i+1) }
                                </ListItem> :
                                <ListItem key={'listitem'+q+i}
                                    className='flag-sidebar__questions flag-sidebar__questions--inactive'>
                                    {this.props.vocab.PROJECT.QUESTION_ + (i+1) }
                                </ListItem>
                        })}
                    </List>
                    <div className='flag-sidebar__review-controls'>
                        {this.state.activeFlag && this.state.activeFlag.map((reply, i) => {
                            return (
                                <div className='flag-sidebar__commentary'
                                    key={'flag-comment'+i}>
                                    <div className='flag-sidebar__commentary-timestamp'>
                                        {TaskStatus.formatDateTime(reply.timestamp)}
                                    </div>
                                    <div className='flag-sidebar__commentary-comment'>
                                        {reply.comment}
                                    </div>
                                    <div className='flag-sidebar__commentary-signature'>
                                        –{this.props.user.users[reply.userId].name}
                                    </div>
                                </div>
                            )
                        })}
                        <textarea className='flag-sidebar__discussion-text' default={this.props.vocab.PROJECT.REPLY} value={this.state.comment} onDOMChange={this.handleChange} />

                        <CheckBox className='flag-sidebar__checkbox'
                            label={this.props.vocab.PROJECT.MARK_RESOLVED}
                            checked={this.state.resolved}
                            onChange={this.handleMarkResolved} />
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
                        <div className='flag-sidebar__button-group'>
                            <Button className='flag-sidebar__button-group-cancel'
                                primary={false}
                                label={this.props.vocab.COMMON.CANCEL}
                                onClick={this.onCancel} />
                            <Button className='flag-sidebar__button-group-send'
                                primary={true}
                                label={this.props.vocab.COMMON.SEND}
                                onClick={this.onSend} />
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

const mapDispatchToProps = dispatch => ({
    updateFlaggedQuestion: (assignee, dueDate) => dispatch(updateFlaggedQuestion(assignee, dueDate))
})

export default connect(mapStateToProps, mapDispatchToProps)(FlagSidebar);
