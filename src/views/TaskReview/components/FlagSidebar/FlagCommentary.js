import React, { Component } from 'react';
import { find } from 'lodash';
import PropTypes from 'prop-types';

import Time from '../../../../utils/Time';
import { renderName } from '../../../../utils/User';

class FlagCommentary extends Component {
    render() {
        return (
            <div className='flag-commentary'>
                {this.props.activeIndex >= 0 &&
                    this.props.ui.flags[this.props.activeIndex].discussion.map((reply, index) => {
                        return (
                    <div className={`flag-commentary__frame${this.props.completed ? ' flag-commentary__frame--readonly' : ''}`}
                        key={`flag-comment${index}`}>
                        <div className='flag-commentary__timestamp'>
                            {Time.renderFlagTimestamp(reply.created, this.props.vocab)}
                        </div>
                        <div className='flag-commentary__comment'>
                            {reply.entry}
                        </div>
                        <div className='flag-commentary__signature'>
                            –{renderName(this.props.profile.id === reply.userFromId ?
                                this.props.profile :
                                find(this.props.users, user => user.id === reply.userFromId))}
                        </div>
                    </div>
                        );
                    })}
                {this.props.activeIndex < 0 &&
                    <div className={`flag-commentary__frame${this.props.completed ? ' flag-commentary__frame--readonly' : ''}`}>
                        {this.props.vocab.PROJECT.NO_COMMENTS}
                    </div>
                }
            </div>
        );
    }
}

FlagCommentary.propTypes = {
    actions: PropTypes.objectOf(PropTypes.func).isRequired,
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    profile: PropTypes.object.isRequired,
    completed: PropTypes.bool,
    ui: PropTypes.shape({
        flags: PropTypes.array,
        flagSideBar: PropTypes.object,
    }).isRequired,
    activeIndex: PropTypes.number.isRequired,
    vocab: PropTypes.object.isRequired,
};

export default FlagCommentary;
