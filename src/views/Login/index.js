import React, { Component } from 'react';
import { connect } from 'react-redux';

class LoginContainer extends Component {
    render() {
        return <div>Sup World</div>;
    }
}

// const mapStateToProps = (state, ownProps) => {
function mapStateToProps() { // Need arg: store
    return {
    //  vocabulary: state.getIn(['settings', 'language', 'vocabulary'])
    };
}

export default connect(mapStateToProps)(LoginContainer);
