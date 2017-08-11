import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'react-lightning-design-system';

const Tile = ({ name, type, id }) => (
  <article className="slds-tile slds-media slds-card__tile slds-hint-parent">
    <div className="slds-media__figure">
      <span className="slds-icon_container slds-icon-standard-contact" title={type}>
        <Icon
          category="standard"
          size="small"
          icon={type}
        />
        <span className="slds-assistive-text">{type}</span>
      </span>
    </div>
    <div className="slds-media__body">
      <div className="slds-grid slds-grid_align-spread slds-has-flexi-truncate">
        <h3 className="slds-truncate" title={name}><a href={`/${id}`}>{name}</a></h3>
      </div>
    </div>
  </article>
)

Tile.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}

export default Tile
