import memory from './memory';
import module from './module';
import process from './process';
import protection from './protection';
import util from './util';

import Types from './memoryTypes';

export default {
  memory,
  module,
  process,
  protection,
  util,
  types: {
    ...Types,
  },
};
