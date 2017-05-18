import React, { Component } from 'react';
import ProjectCard from './ProjectCard';
import SurveyCard from'./SurveyCard';
import DescriptionCard from './DescriptionCard';
import { connect } from 'react-redux';

class Summary extends Component {
  render() {
    return (
      <div className="row">
        <ProjectCard />
        <SurveyCard />
        <DescriptionCard />
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
