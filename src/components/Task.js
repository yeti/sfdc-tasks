import React from 'react'
import PropTypes from 'prop-types'

const Task = ({ id, Name }) => (
  <li>
    {Name} ({id})
  </li>
)

Task.propTypes = {
  id: PropTypes.string.isRequired,
  Name: PropTypes.string.isRequired,
  attributes: PropTypes.object,
}

export default Task
