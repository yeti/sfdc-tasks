import React from 'react'
import PropTypes from 'prop-types'

const Avatar = ({ user }) => (
  <span className="slds-avatar slds-avatar--medium slds-avatar_circle">
    {user.picture
      ? <img alt={user.name} src={user.picture} title={user.name} />
      : <abbr className="slds-avatar__initials slds-icon-standard-user" title={user.name}>{user.initials}</abbr>
    }
  </span>
)

Avatar.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    picture: PropTypes.string
  }).isRequired,
}

export default Avatar
