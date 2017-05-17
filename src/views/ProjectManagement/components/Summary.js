import React, { Component } from 'react';
import { connect } from 'react-redux';

class Summary extends Component {
  render() {
    return (
      <div>
        {this.props.vocab.PROJECT.PROJECT}
        {this.props.vocab.PROJECT.STATUS}
        {this.props.vocab.PROJECT.SURVEY}
        {this.props.vocab.PROJECT.STATUS}
        <button className="btn btn-primary">Whatever.</button>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    data: state,
    vocab: state.settings.language.vocabulary
  }
}

export default connect(mapStateToProps)(Summary);
