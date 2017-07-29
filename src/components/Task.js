import React from 'react'
import PropTypes from 'prop-types'

const Task = ({ Id, Subject }) => (
  <li>
    <a href={`/${Id}`}>
      {Subject}
    </a>
  </li>
)

Task.propTypes = {
  Id: PropTypes.string.isRequired,
  Subject: PropTypes.string.isRequired,
  attributes: PropTypes.object,
}

export default Task
