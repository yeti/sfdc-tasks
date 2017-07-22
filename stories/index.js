import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { withKnobs } from '@kadira/storybook-addon-knobs';
import configure from 'lightning-configuration';
configure();

const storyContextes = require.context('./', true, /.jsx/);

const res = storyContextes.keys().forEach(i => {
	const res = storyContextes(i);
	res.default.addDecorator(withKnobs);
});
