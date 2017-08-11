import React from 'react'
import PropTypes from 'prop-types'
import Task from './Task'
import ListHeader from './ListHeader'
import './TaskList.scss';

const TaskList = ({ tasks, visibilityFilter }) => (
  <div>
    <ListHeader filterLabel={visibilityFilter.label} nItems={tasks.length}/>
    <ul className="TaskList">
      {tasks.map(task =>
        <Task
          key={task.id}
          id={task.id}
          name={task.name}
          dueDate={task.dueDate}
          owner={task.owner}
          related={task.relatedRecord}
        />
      )}
    </ul>
  </div>
)

TaskList.propTypes = {
  visibilityFilter: PropTypes.shape({
    label: PropTypes.string.isRequired,
    filter: PropTypes.string.isRequired,
  }).isRequired,
  tasks: PropTypes.array.isRequired,
}

export default TaskList
