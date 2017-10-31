import React, { Component } from 'react';
import _ from 'lodash';

export class Bool extends Component {
  render(){
    let boolProp = [];
    const rawValue = this.props.defaultValue ? this.props.defaultValue : this.props.value;
    const value = rawValue === '' ? undefined : rawValue;
    if(value != undefined && value == true) {
      boolProp[0] = {checked: "checked"};
    }
    else {
      boolProp[0] = {};
    }
    if(value != undefined && value == false) {
      boolProp[1] = {checked: "checked"};
    }
    else {
      boolProp[1] = {};
    }
    return(
        <div id={this.props.id+'bool'}>
          <p className='survey-question__question'>{this.props.text}</p>
          <div className='survey-question__response survey-question__response--bool'>
            <input
              name={this.props.id}
              id={this.props.id+'.0'}
              required={this.props.required}
              value={true}
              data-fieldtype='bool'
              type='radio'
              placeholder={this.props.placeholder}
              {...boolProp[0]}
              onChange={this.props.changeForm}/>
            <label
              htmlFor={this.props.id+'.0'}>
              {this.props.vocab.getIn(['COMMON', 'YES'])}
            </label>
            <input
              name={this.props.id}
              id={this.props.id+'.1'}
              required={this.props.required}
              value={false}
              data-fieldtype='bool'
              type='radio'
              placeholder={this.props.placeholder}
              {...boolProp[1]}
              onChange={this.props.changeForm}/>
            <label
              htmlFor={this.props.id+'.1'}>
              {this.props.vocab.getIn(['COMMON', 'NO'])}
            </label>
          </div>
      </div>
    )
  }
}

export class Choice extends Component {
  render(){
    return(
      <div key={this.props.id}>
        <p className='survey-question__question'>{this.props.text}</p>
        <div className='survey-question__response survey-question__response--radio'>
        {this.props.choices.map(choice => {
          let prop = {};
          const value = this.props.defaultValue ? this.props.defaultValue : this.props.value;
          if(value && value == choice.id) {
            prop = {checked: 'checked'}
          }
          return ([
            <input type='radio'
              name={this.props.id}
              id={this.props.id +'.'+choice.id}
              value={choice.id}
              data-fieldtype='choice'
              required={this.props.required}
              {...prop}
              onChange={this.props.changeForm}/>,
            <label htmlFor={this.props.id +'.'+choice.id}>
              {choice.text}
            </label>
          ])}
        )}
        </div>
      </div>
    )
  }
}

export class Input extends Component {
  render() {
    const inputClassName = this.props.className
        ? this.props.className
        : 'survey-question__response survey-question__response--text';
    return(
      <div key={this.props.id} >
        <p className='survey-question__question' htmlFor={this.props.id}>{this.props.text}</p>
        <input
          autoFocus
          className={inputClassName}
          name={this.props.name}
          id={this.props.id}
          type={this.props.type}
          required={this.props.required}
          onChange={ this.props.changeForm }
          onBlur={this.props.onBlur}
          onKeyPress={this.props.onKeyPress ? ::this.props.onKeyPress : undefined}
          defaultValue={this.props.defaultValue}
          value={this.props.value}
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
          placeholder={this.props.placeholder}
          autoComplete='off'
          data-fieldtype='text' />
      </div>
    )
  }
}

export class InputInteger extends Component {
  render() {
    const inputClassName = this.props.className
        ? this.props.className
        : 'survey-question__response survey-question__response--text';
    return(
      <div key={this.props.id} >
        <p className='survey-question__question' htmlFor={this.props.id}>{this.props.text}</p>
        <input
          autoFocus
          className={inputClassName}
          name={this.props.name}
          id={this.props.id}
          type={this.props.type}
          required={this.props.required}
          onChange={ this.props.changeForm }
          onBlur={this.props.onBlur}
          onKeyPress={this.props.onKeyPress ? ::this.props.onKeyPress : undefined}
          defaultValue={this.props.defaultValue}
          value={this.props.value}
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
          placeholder={this.props.placeholder}
          autoComplete='off'
          data-fieldtype='integer' />
      </div>
    )
  }
}

export class InputZip extends Component {
  render() {
    const inputClassName = this.props.className
        ? this.props.className
        : 'survey-question__response survey-question__response--text';
    return(
      <div key={this.props.id} >
        <p className='survey-question__question' htmlFor={this.props.id}>{this.props.text}</p>
        <input
          autoFocus
          className={inputClassName}
          name={this.props.name}
          id={this.props.id}
          type={this.props.type}
          required={this.props.required}
          onChange={ this.props.changeForm }
          // onBlur={this.props.onBlur}
          onKeyPress={this.props.onKeyPress ? ::this.props.onKeyPress : undefined}
          defaultValue={this.props.defaultValue}
          value={this.props.value}
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
          placeholder={this.props.placeholder}
          autoComplete='off'
          data-fieldtype='zip' />
      </div>
    )
  }
}

export class InputYear extends Component {
  render() {
    const inputClassName = this.props.className
        ? this.props.className
        : 'survey-question__response survey-question__response--text';
    return(
      <div key={this.props.id} >
        <p className='survey-question__question' htmlFor={this.props.id}>{this.props.text}</p>
        <input
          autoFocus
          className={inputClassName}
          name={this.props.name}
          id={this.props.id}
          type={this.props.type}
          required={this.props.required}
          onChange={ this.props.changeForm }
          onKeyPress={this.props.onKeyPress ? ::this.props.onKeyPress : undefined}
          defaultValue={this.props.defaultValue}
          value={this.props.value}
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
          placeholder={this.props.placeholder}
          autoComplete='off'
          data-fieldtype='year' />
      </div>
    )
  }
}

// TODO:
// export class YearDropdown extends Component {
//   render() {
//     return (
//       <div key={this.props.id} >
//         <p className='survey-question__question' htmlFor={this.props.id}>{this.props.text}</p>
//         <select
//
//         />
//       </div>
//     );
//   }
// }

export class Choices extends Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
  }

  componentWillMount(){
    this._textTriggered = false;
    this._textId;
  }

  handleChange(event) { //For Surveyz
    if (event.target.getAttribute('data-fieldtype') == 'choices.text') {
      this._textId = event.target.value;
      this._textTriggered = !this._textTriggered;
      this.forceUpdate();
    } else {
      this.props.changeFormChoices(event.target.getAttribute('data-fieldtype'),
      this.props.id, event.target.value, event.target.checked);
    }
  }

  handleChangeText(event) {
    this.props.changeFormChoices(event.target.getAttribute('data-fieldtype'),
    this.props.id, this._textId, event.target.value);
  }

  render(){
    return (
      <div className='' key={this.props.id} >
        <p className='survey-question__question'>{this.props.text}</p>
        <div className='survey-question__response survey-question__response--checkboxes'>
          {this.props.choices.map(choice => {
            let prop = {};
            const value = this.props.defaultValue ? this.props.defaultValue : this.props.value;
            const choices = value || [];
            const choiceValue = _.find(choices, {"id": choice.id});
            if(choiceValue !== undefined && choiceValue.boolValue == true) {
              prop = {checked: "checked"};
            }
            return ([
              <input type='checkbox'
                name={this.props.id}
                id={this.props.id + '.' + choice.id}
                value={choice.id}
                data-fieldtype={'choices.'+choice.type}
                {...prop}
                onChange={this.handleChange}/>,
              <label htmlFor={this.props.id + '.' + choice.id}>
                {choice.text}
              </label>
            ])}
          )}
        </div>
        {this._textTriggered &&
        (<div id={this.props.id+'.textInput'}>
          <label>{this.props.vocab.getIn(['FORM_VALIDATION', 'PLEASE_ENTER_VALID_VALUE'])}</label>
          <input name={this.props.id+'.text'}
            onChange={this.handleChangeText}
            autoComplete='off'
            data-fieldtype='choices.text'/>
        </div>)}
      </div>
    )
  }
}
