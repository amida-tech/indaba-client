import React, { Component} from 'react';

export class SurveyNavigator extends Component {
  render() {
    return(
        <div id={this.props.id}>
          {this.props.surveyField}
          <div className="form__footer">
            <button
              className="buttonSecondary pull-left"
              onClick={this.props.previous}
              type="button"
            >
              {this.props.vocab.getIn(['COMMON', 'BACK'])}
            </button>
            <button
              onClick={this.props.next}
              className="buttonPrimary pull-right"
              type="button"
              data-type={this.props.type}
              data-required={this.props.required}
              value={this.props.location}>
              {this.props.location != this.props.final ?
              (this.props.vocab.getIn(['COMMON', 'CONTINUE'])) :
              (this.props.vocab.getIn('COMMON', 'NAV', 'REGISTER'))}
            </button>
          </div>
        </div>
      )
  }
}
