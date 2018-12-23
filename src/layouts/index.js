import React, { Component } from 'react';
import { connect } from 'react-redux';

import NavContainer from '../views/PrimaryNav';

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

function mapStateToProps(state) {
    return {
        data: state,
        vocab: state.settings.language.vocabulary,
    };
}

export default connect(mapStateToProps)(Layout);
