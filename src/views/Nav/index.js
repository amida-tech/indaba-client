import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';


class NavContainer extends Component {

    render() {
      return (
        <nav className="nav"> Where you going, psycho boy?</nav>
      )
    }
}

function mapStateToProps (ownProps) {
    return {
    }
}


export default connect(mapStateToProps)(NavContainer)
