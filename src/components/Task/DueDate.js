import React from 'react'
import PropTypes from 'prop-types'

const DueDate = ({ dateString, isPast }) => (
  <span style={isPast ? {color: 'red'} : null}>{dateString}</span>
)

DueDate.propTypes = {
  dateString: PropTypes.string.isRequired,
  isPast: PropTypes.bool.isRequired,
}

export default DueDate
