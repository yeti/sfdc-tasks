import React from 'react'
import PropTypes from 'prop-types'
import Tile from './Tile'

const Task = ({ id, name, related }) => (
  <li>
    <article className="Task slds-card">
      <div className="slds-card__header slds-grid">
        <header className="slds-media slds-media_center slds-has-flexi-truncate">
          <div className="slds-media__body">
            <h2>
              <a href={`/${id}`} className="slds-card__header-link slds-truncate" title="[object Object]">
                <span className="slds-text-heading_small">{name}</span>
              </a>
            </h2>
          </div>
        </header>
      </div>
      <div className="slds-card__body">
        {related &&
          <ul className="slds-card__body_inner slds-grid slds-wrap slds-grid_pull-padded">
            <li className="slds-p-horizontal_small slds-size_1-of-1 slds-medium-size_1-of-3">
              <Tile name={related.name} type={related.iconType} id={related.id}/>
            </li>
          </ul>
        }
      </div>
    </article>
  </li>
)

Task.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  related: PropTypes.object,
}

export default Task
