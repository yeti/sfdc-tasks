import { util } from 'react-lightning-design-system';
import './index.scss';

require.context('@salesforce-ux/design-system/assets/icons', true, /.*-sprite\/svg\/.*\.svg/);

export default () => {
  util.setAssetRoot(`${(window['__STATIC_RESOURCE_ZIP'] || '') + '/assets'}`);
}
