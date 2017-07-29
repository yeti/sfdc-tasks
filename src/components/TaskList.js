import React from 'react'
import PropTypes from 'prop-types'
import Task from './Task'

const TaskList = ({ tasks }) => (
  <ul>
    {tasks.map(task =>
      <Task
        key={task.Id}
        {...task}
      />
    )}
  </ul>
)

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
}

export default TaskList
