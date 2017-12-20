import React, { Component } from 'react';
import { find, findIndex } from 'lodash';
import PropTypes from 'prop-types';

import Time from '../../../../utils/Time';
import { renderName } from '../../../../utils/User';

class FlagCommentary extends Component {
    render() {
        const activeIndex = findIndex(this.props.ui.flags, flag =>
            parseInt(flag.questionId, 10) === this.props.ui.flagSidebar.activeId);
        return (
            <div className='flag-commentary'>
                {activeIndex >= 0 &&
                    this.props.ui.flags[activeIndex].discussion.map((reply, index) => {
                        return (
                    <div className='flag-commentary__frame'
                        key={`flag-comment${index}`}>
                        <div className='flag-commentary__timestamp'>
                            {Time.renderGeneralTimestamp(reply.created)}
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
                {activeIndex < 0 &&
                    <div className='flag-commentary__frame'>
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
    ui: PropTypes.shape({
        flags: PropTypes.array,
        flagSideBar: PropTypes.object,
    }).isRequired,
    vocab: PropTypes.object.isRequired,
};

export default FlagCommentary;
