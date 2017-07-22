import React from 'react';
import { action, storiesOf } from '@kadira/storybook';
import { Icon } from 'react-lightning-design-system';

export default storiesOf('Icon', module)
  .add('Heart', () => {
  	return (
  		<Icon container="circle" category="custom" icon="custom1" />
  	);
  })
