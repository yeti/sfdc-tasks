/**
This file is responsible for setting a magic variable in webpack
to ensure that require.ensure calls use the right path when loading
chunks.
**/

// eslint-disable-next-line
__webpack_public_path__ = (window.__STATIC_RESOURCE_ZIP || '') + '/';
import 'regenerator-runtime/runtime';
