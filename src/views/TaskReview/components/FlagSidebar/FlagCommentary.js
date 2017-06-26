import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import _ from 'lodash';

import TaskStatus from '../../../../utils/TaskStatus';

class FlagCommentary extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Box className='flag-commentary'>
                {this.props.ui.flagSidebar.active &&
                    this.props.ui.flagSidebar.active.flagHistory.map((reply, index) => {
                    return (
                        <div className='flag-commentary__frame'
                            key={'flag-comment' + index}>
                            <div className='flag-commentary__timestamp'>
                                {TaskStatus.formatDateTime(reply.timestamp)}
                            </div>
                            <div className='flag-commentary__comment'>
                                {reply.comment}
                            </div>
                            <div className='flag-commentary__signature'>
                                –{_.find(this.props.users, (user) => user.id === reply.userId).name}
                            </div>
                        </div>
                    )
                })}
                <textarea className='flag-commentary__discussion'
                    placeholder={this.props.vocab.PROJECT.REPLY}
                    value={this.props.ui.flagSidebar.comment}
                    onChange={(event) => this.props.actions.updateFlagComment(event.target.value)} />
            </Box>
        )
    }
}

export default FlagCommentary;
