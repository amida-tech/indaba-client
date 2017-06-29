import React, { Component } from 'react';
import { connect } from 'react-redux';

class DashboardContainer extends Component {
    render() {
        return <div>You are a dashing fellow.</div>;
    }
}

const mapStateToProps = () => { // Needed args: state
    return {
    // vocabulary: state.getIn(['settings', 'language', 'vocabulary'])
    };
};

export default connect(mapStateToProps)(DashboardContainer);
