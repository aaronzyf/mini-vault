import 'react-native-get-random-values';
import '@ethersproject/shims';
import 'react-native-url-polyfill/auto';

if (typeof Buffer === 'undefined') {
  global.Buffer = require('buffer').Buffer;
}
