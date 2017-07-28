import React from 'react'
import PropTypes from 'prop-types'
import Task from './Task'

const TaskList = ({ tasks }) => (
  <ul>
    {tasks.map(todo =>
      <Task
        key={todo.id}
        {...todo}
      />
    )}
  </ul>
)

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    Name: PropTypes.string.isRequired,
    attributes: PropTypes.object
  }).isRequired).isRequired,
}

export default TaskList
