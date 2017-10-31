import React, { Component } from 'react';
import { Link } from 'react-router';

class Button extends Component {
    render() {
        let htmlType;
        const validHtmlTypes = ['button', 'reset', 'submit', 'a'];

        if(validHtmlTypes.includes(this.props.htmlType)) {
            htmlType=this.props.htmlType
        } else {
            htmlType = this.props.href != undefined ? 'Link' : 'button'; 
        }

        if(htmlType === 'Link') {
           return(
                <Link 
                    autoFocus={this.props.autofocus}
                    className={`button 
                                button__size--${this.props.size} 
                                button__color--${this.props.color} 
                                button__loading--${this.props.loading}  
                                button__style--${this.props.style} 
                                button__type--${this.props.type} 
                                ${this.props.type}--${this.props.icon} 
                                ${this.props.className}`}
                    disabled={this.props.disabled}
                    id={this.props.id}
                    onClick={this.props.handler}
                    tabIndex={this.props.tabIndex}
                    to={this.props.href}>
                    {this.props.type != 'icon' && this.props.text}
                </Link>
            ) 
        } else {
            return(
                <button 
                    autoFocus={this.props.autofocus}
                    className={`button 
                                ${this.props.loading === true && 'button--loading'}
                                ${(this.props.color != undefined) ? `button__color--${this.props.color} ` : `button__color--default `}
                                ${(this.props.size != undefined) ? `button__size--${this.props.size} ` : `button__size--default `}
                                ${(this.props.style != undefined) ? `button__style--${this.props.style} ` : `button__style--default `}
                                ${(this.props.type != undefined) ? `button__type--${this.props.style} ` : `button__type--text `}
                                ${this.props.type}--${this.props.icon} 
                                ${(this.props.className != undefined) ? `${this.props.className}` : ` `}`}
                    disabled={this.props.disabled}
                    form={this.props.form}
                    formAction={this.props.formaction}
                    formEncType={this.props.formenctype}
                    formMethod={this.props.formmethod}
                    formTarget={this.props.formtarget}
                    formNoValidate={!this.props.formvalidate}
                    id={this.props.id}
                    name={this.props.name}
                    onClick={this.props.handler}
                    tabIndex={this.props.tabIndex}
                    title={this.props.title}
                    type={this.props.htmlType}
                    value={this.props.value}>
                    {(this.props.type != 'icon') ? this.props.text : 
                        <i className={`fa ${this.props.icon}`} aria-hidden="true"></i>
                     }
                    {this.props.textHidden != undefined && 
                        <div className={`button__hidden-panel button__hidden-panel--${this.props.animation}`}>
                            {this.props.textHidden}
                        </div>
                    }
                </button>
            )
        }
    }
}

export default Button;
