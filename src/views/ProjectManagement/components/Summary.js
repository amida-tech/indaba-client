import React, { Component } from 'react';
import ProjectCard from './ProjectCard';
import SurveyCard from'./SurveyCard';
import DescriptionCard from './DescriptionCard';

class Summary extends Component {
  render() {
    return (
      <div>
        <ProjectCard/>
        <SurveyCard/>
        <DescriptionCard/>
      </div>
    );
  }
}

export default Summary;
