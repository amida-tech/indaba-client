import React, {Component} from 'react';

class Widget extends Component {

    componentDidMount() {}
    render() {
        return (
            <section className={`${this.props.blockName}`} id={`${this.props.blockName}`}>
                <div className={`${this.props.blockName}__heading`}>
                    {/*<div className={`${this.props.blockName}__heading-menu`}>
                        <input
                            id="ddd"
                            className={`${this.props.blockName}__heading-menu-controller`}
                            type="checkbox"/>
                        <label
                            htmlFor="ddd"
                            className={`${this.props.blockName}__heading-menu-trigger`}></label>
                        <ul className={`${this.props.blockName}__heading-menu-list`}>
                            <li className={`${this.props.blockName}__heading-menu-list-item`}>{this.props.title}</li>
                            <li className={`${this.props.blockName}__heading-menu-list-item`}>Move Question Up</li>
                            <li className={`${this.props.blockName}__heading-menu-list-item`}>Move Question Down</li>
                            <li className={`${this.props.blockName}__heading-menu-list-item`}>Load Existing Question</li>
                            <li className={`${this.props.blockName}__heading-menu-list-item`}>Delete Question</li>
                        </ul>
                    </div>*/}
                    <h1 className={`${this.props.blockName}__heading-title`}>{this.props.title}</h1>
                    {this.props.description != undefined && <p className={`${this.props.blockName}__heading-description`}>{this.props.description}</p>
}
                    <div className={`${this.props.blockName}__heading-container`}>
                        {this.props.headerComponent}
                    </div>
                </div>
                <div className={`${this.props.blockName}__content`}>
                    <input
                        id="eee"
                        className={`${this.props.blockName}__content-warning-controller`}
                        type="checkbox"
                        value="off"/>
                    <label
                        htmlFor="eee"
                        className={`${this.props.blockName}__content-warning-trigger`}></label>
                    <div className={`${this.props.blockName}__content-warning`}>
                        {'Error. Make sure you do have a really long error. This is a problem. Error error'
                        + ' error. There are a lot of things that can break, and this is one of them. Error.'
                        + ' Make sure you do have a really long error. This is a problem. Error error error.'
                        + ' There are a lot of things that can break, and this is one of them.'}
                    </div>
                    <div className={`${this.props.blockName}__content-container`}>
                        {this.props.children}
                    </div>
                </div>
                <div className={`${this.props.blockName}__footer`}>
    <div className={`${this.props.blockName}__footer-content-container`}>
      {this.props.footerComponent}
    </div>
  </div>
            </section>
        );
    }
}

export default Widget;
