import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions';

class PMDashboard extends Component {
    render() {
        return (
            <div className='pm-dashboard'>
                <input type='text'
                    placeholder={this.props.vocab.COMMON.SEARCH}
                    onChange={evt => this.props.actions.setSearchQuery(evt.target.value)}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    vocab: state.settings.language.vocabulary,
});
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, actions), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PMDashboard);
