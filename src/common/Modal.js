import React, {Component} from 'react';

class Modal extends Component {

    _dismissModal(modalID) {
        document.getElementById(modalID).className = modalID + ' ' + modalID + '--closed';
        if(this.props.callback) {
          this.props.callback();
        }
    }

    render() {
        return(
        <section
            className={`${this.props.blockName}`} id={`${this.props.blockName}`}>
            <div className={`${this.props.blockName}__container`}>
                <div className={`${this.props.blockName}__heading`}>
                    {this.props.dismissible &&
                    <div className={`${this.props.blockName}__heading-action-right`}>
                        <button className={`${this.props.blockName}__heading-action-button`}
                            onClick={() => {this._dismissModal(`${this.props.blockName}`)}}
                        >
                            <i className={`${this.props.blockName}__heading-action-button-icon fa-times`} aria-hidden="true"></i>
                            <span className={`${this.props.blockName}__heading-action-button-text`}>Close</span>
                        </button>
                    </div>
                    }
                    { this.props.prompt && <p className={`${this.props.blockName}__heading-prompt`}>{this.props.prompt}</p> }
                    { this.props.promptComponent && this.props.promptComponent }
                </div>
                {this.props.children &&
                <div className={`${this.props.blockName}__content`}>
                    <div className={`${this.props.blockName}__content-container`}>
                        {this.props.children}
                    </div>
                </div>
                }
                <div className={`${this.props.blockName}__footer`}>
                    <div className={`${this.props.blockName}__footer-content-container`}>
                        {this.props.footerActions.map((action) => action )}
                    </div>
                </div>
            </div>
    </section>
            );
    }
}

export default Modal;
