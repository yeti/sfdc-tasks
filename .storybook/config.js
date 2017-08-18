import { configure } from '@kadira/storybook';
import { setOptions } from '@kadira/storybook-addon-options';

function loadStories() {
  require('../stories');
}

configure(loadStories, module);

setOptions({
	downPanelInRight: true
});
