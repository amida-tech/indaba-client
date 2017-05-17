import React, { Component } from 'react';
import { connect } from 'react-redux';

class Summary extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-sm-5">
          {this.props.vocab.PROJECT.PROJECT} {this.props.vocab.PROJECT.STATUS}
        </div>
        <div className="col-sm-5">
          {this.props.vocab.PROJECT.SURVEY} {this.props.vocab.PROJECT.STATUS}
        </div>
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
