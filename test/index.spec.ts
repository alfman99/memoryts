import base from '@memoryts/base';

import {
  Bit,
  Bool,
  Char,
  Short,
  Int8,
  Float,
  Double,
  Int16,
  Int32,
} from '../src/memoryTypes';
import { read, write } from '../src/memory';

const PROCESS_NAME = 'Notepad.exe';
const ADDRESS = 0x7fff33db3930;

test('read all datatypes', () => {
  try {
    const processHandler = base.openProcessName(PROCESS_NAME);

    const results: any[] = [];

    results.push(read(Bit, processHandler, ADDRESS));
    results.push(read(Bool, processHandler, ADDRESS));
    results.push(read(Char, processHandler, ADDRESS));
    results.push(read(Short, processHandler, ADDRESS));
    results.push(read(Int8, processHandler, ADDRESS));
    results.push(read(Int16, processHandler, ADDRESS));
    results.push(read(Int32, processHandler, ADDRESS));
    results.push(read(Float, processHandler, ADDRESS));
    results.push(read(Double, processHandler, ADDRESS));

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
    console.log(results.map(r => r.value));
  } catch (e) {
    console.error(e);
  }
});

test('write all datatypes', () => {
  try {
    const processHandler = base.openProcessName(PROCESS_NAME);

    write(
      processHandler,
      ADDRESS,
      new Bit(new Uint8Array([1, 2, 3, 4, 5, 6, 7]))
    );
    write(processHandler, ADDRESS, new Bool(new Uint8Array([1])));
    write(processHandler, ADDRESS, new Char(new Uint8Array([1])));
    write(processHandler, ADDRESS, new Short(new Uint8Array([1])));
    write(processHandler, ADDRESS, new Int8(new Uint8Array([1])));
    write(processHandler, ADDRESS, new Int16(new Uint8Array([1])));
    write(processHandler, ADDRESS, new Int32(new Uint8Array([1])));
    write(processHandler, ADDRESS, new Float(new Uint8Array([1])));
    write(processHandler, ADDRESS, new Double(new Uint8Array([1])));
  } catch (e) {
    console.error(e);
  }
});
