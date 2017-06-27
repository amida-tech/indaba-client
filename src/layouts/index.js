import React, { Component } from 'react';
import NavContainer from '../views/PrimaryNav';
import { connect } from 'react-redux';

class Layout extends Component {

    render() {
        return (
      <div>
        <NavContainer {...this.props} />
      </div>
        );
    }
}

Layout.displayName = 'Layout';

function mapStateToProps(state, ownProps) {
    return {
        data: state,
        vocab: state.settings.language.vocabulary,
    };
}

export default connect(mapStateToProps)(Layout);
