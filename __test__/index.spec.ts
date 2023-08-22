/* eslint-disable no-console */
import test from 'ava';

import base from '@memoryts/base';
import { Char, TArray } from '../src/memoryTypes';
import { readArray } from '../src/memory';

test('read memory from process array of chars', t => {
  try {
    const processHandler = base.openProcessName('Notepad.exe');
    const address = 0x7fff33db3930;

    const buffer = readArray([Char, 10], processHandler, address);

    console.error(buffer.value.map(v => v.value));

    t.pass();
  } catch (e) {
    console.error(e);
  }
});

// test('read memory from process', t => {
//   try {
//     const processHandler = base.openProcessName('Notepad.exe');
//     const address = 0x7fff33db3930;

//     const buffer = readArray([TArray, 10], processHandler, address);

//     console.error(buffer.value.map(v => v.value));

//     t.pass();
//   } catch (e) {
//     console.error(e);
//   }
// });
