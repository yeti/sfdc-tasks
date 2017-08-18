import React from 'react';
import { action, storiesOf } from '@kadira/storybook';

import DueDate from 'components/Task/DueDate';
import {DateWrapper} from 'utils/TaskWrapper';

export default storiesOf('Due Date', module)
  // Due Date in Future
  .add('In the future', () => {
    const dueDate = new DateWrapper('2018-01-10');
    return (
      <DueDate dateString={dueDate.formattedDate} isPast={dueDate.isPast}/>
    );
  })
  // Due Date in Past
  .add('In the past', () => {
    const dueDate = new DateWrapper('2016-01-10');
    return (
      <DueDate dateString={dueDate.formattedDate} isPast={dueDate.isPast}/>
    );
  })
  // Due Date missing
  .add('Missing', () => {
    const dueDate = new DateWrapper(null);
    return (
      <DueDate dateString={dueDate.formattedDate} isPast={dueDate.isPast}/>
    );
  })
