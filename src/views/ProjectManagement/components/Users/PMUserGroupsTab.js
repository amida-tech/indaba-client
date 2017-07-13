import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UserGroupList from '../../../../common/components/UserGroupList';
import { updateUserGroupListSearchQuery } from '../../actions';

class PMUserGroupsTab extends Component {
    filterGroup(group, query) {
        return group.name.toLowerCase().includes(query.toLowerCase());
    }
    render() {
        return (
            <div className='pm-user-groups-tab'>
                <input type='text' className='pm-user-groups-tab__search'
                    onChange={evt => this.props.onSearch(evt.target.value)}
                    placeholder={this.props.vocab.COMMON.SEARCH}/>
                <UserGroupList columnHeaders={true}
                    groups={this.props.project.userGroups
                        .filter(group => this.filterGroup(group, this.props.query))}
                    users={this.props.users}
                    vocab={this.props.vocab}
                    onDeleteClick={this.props.onDeleteGroup}
                    onGroupClick={this.props.onGroupClick} />
            </div>
        );
    }
}

PMUserGroupsTab.propTypes = {
    columnHeaders: PropTypes.bool,
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    project: PropTypes.object.isRequired,
    vocab: PropTypes.object,
    onDeleteClick: PropTypes.func,
    onGroupClick: PropTypes.func,
    onSearch: PropTypes.func,
};

const mapStateToProps = state => ({
    query: state.manager.ui.userGroupListSearchQuery,
});

const mapDispatchToProps = dispatch => ({
    onSearch: query => dispatch(updateUserGroupListSearchQuery(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PMUserGroupsTab);
