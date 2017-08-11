import React from 'react'

const Card = () => {
  return (
    <article className="slds-card">
      <div className="slds-card__header slds-grid">
        <header className="slds-media slds-media_center slds-has-flexi-truncate">
          <div className="slds-media__figure">
            <span className="slds-icon_container slds-icon-standard-contact" title="description of icon when needed">
      
            </span>
          </div>
          <div className="slds-media__body">
            <h2>
              <a href="javascript:void(0);" className="slds-card__header-link slds-truncate" title="[object Object]">
                <span className="slds-text-heading_small">Card Header</span>
              </a>
            </h2>
          </div>
        </header>
        <div className="slds-no-flex">
          <button className="slds-button slds-button_neutral">New</button>
        </div>
      </div>
      <div className="slds-card__body slds-card__body_inner">Card Body (custom goes in here)</div>
      <footer className="slds-card__footer">Card Footer</footer>
    </article>
);
}

export default Card;
