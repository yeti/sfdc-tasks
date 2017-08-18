import React from 'react';
import { action, storiesOf } from '@kadira/storybook';

import Avatar from 'components/Task/Avatar';
import {OwnerWrapper} from 'utils/TaskWrapper';

export default storiesOf('Avatar', module)

  .add('With picture', () => {
    const owner = new OwnerWrapper({
      Name: 'Randy Randers',
      SmallPhotoUrl: 'https://media.giphy.com/media/j5QcmXoFWl4Q0/giphy.gif',
    });

    return (
      <Avatar user={owner}/>
    );
  })

  .add('Without picture', () => {
    const owner = new OwnerWrapper({
      Name: 'Jimmy Bobby',
      SmallPhotoUrl: '/profilephoto/005',
    });

    return (
      <Avatar user={owner}/>
    );
  })
