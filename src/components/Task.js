import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'react-lightning-design-system';

const Task = ({ Id, Subject }) => (
  <li>
    <article className="Task slds-card">
      <div className="slds-card__header slds-grid">
        <header className="slds-media slds-media_center slds-has-flexi-truncate">
          <div className="slds-media__figure">
            <span className="slds-icon_container slds-icon-standard-contact" title="description of icon when needed">
              <Icon
                category="standard"
                size="medium"
                icon="task"
              />
            </span>
          </div>
          <div className="slds-media__body">
            <h2>
              <a href={`/${Id}`} className="slds-card__header-link slds-truncate">
                <span className="slds-text-heading_small">{Subject}</span>
              </a>
            </h2>
          </div>
        </header>
      </div>
    </article>
  </li>
)

Task.propTypes = {
  Id: PropTypes.string.isRequired,
  Subject: PropTypes.string.isRequired,
  attributes: PropTypes.object,
}

export default Task
