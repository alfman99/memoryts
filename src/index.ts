import memory from './memory';
import memoryTypes from './memoryTypes';
import module from './module';
import patternScanning from './patternScanning';
import process from './process';
import protection from './protection';
import types from './typings';
import util from './util';

export default {
  ...memory,
  ...module,
  ...process,
  ...protection,
  ...util,
  types: {
    ...memoryTypes,
  },
  ...patternScanning,
  ...types,
};
