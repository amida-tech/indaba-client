import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { renderName } from '../../../../../utils/User';

class PMUserListRow extends Component {
    render() {
        const groups = this.props.groups.filter(g => g.users.includes(this.props.user.id))
            .map(g => g.name).join(', ');
        return (
            <div className='pm-user-list-row'>
                <div className='pm-user-list-row__cell'
                    onClick={this.props.onNameClick}>
                    {renderName(this.props.user)}
                </div>
                <div className='pm-user-list-row__cell'>
                    {groups}
                </div>
                <div className='pm-user-list-row__cell'>
                </div>
            </div>
        );
    }
}

PMUserListRow.propTypes = {
    user: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
    }).isRequired,
    groups: PropTypes.arrayOf(PropTypes.object).isRequired,
    onNameClick: PropTypes.func.isRequired,
};

export default PMUserListRow;
