import {
  Bit,
  Bool,
  Char,
  Double,
  Float,
  Int16,
  Int32,
  Int8,
  Short,
} from '../src/memoryTypes';
import { Architecture, RunningPrivileged } from '../src/util';

import { Read, ReadArray, Write } from '../src/memory';
import { OpenProcess } from '../src/process';

import { FindModule } from '../src/module';

const PROCESS_NAME = 'Notepad.exe';

test('check architecture', () => {
  expect(process.arch).toEqual(Architecture());
});

test('check if running privileged', () => {
  expect(RunningPrivileged()).toEqual(true);
});

test('read string utf16le', () => {
  const processHandle = OpenProcess('Notepad.exe');
  const charArray = ReadArray([Char, 20], processHandle, 0x7ffb07ba3930);
  console.log(charArray.rawBuffer.toString('utf16le'));
});

test('calculate static pointer from module (textinputframework.dll) and read and write all datatypes', () => {
  try {
    const moduleInfo = FindModule(PROCESS_NAME, 'textinputframework.dll');
    const offset = 0x133930;
    const ADDRESS = moduleInfo.modBaseAddr + offset;

    const handler = OpenProcess(PROCESS_NAME);

    const results: boolean[] = [];

    Write(handler, ADDRESS, new Bit(1));
    results.push(Read(Bit, handler, ADDRESS).equals(new Bit(1)));

    Write(handler, ADDRESS, new Bool(false));
    results.push(Read(Bool, handler, ADDRESS).equals(new Bool(false)));

    Write(handler, ADDRESS, new Char('-'));
    results.push(Read(Char, handler, ADDRESS).equals(new Char('-')));

    Write(handler, ADDRESS, new Short(45));
    results.push(Read(Short, handler, ADDRESS).equals(new Short(45)));

    Write(handler, ADDRESS, new Int8(6));
    results.push(Read(Int8, handler, ADDRESS).equals(new Int8(6)));

    Write(handler, ADDRESS, new Int16(234));
    results.push(Read(Int16, handler, ADDRESS).equals(new Int16(234)));

    Write(handler, ADDRESS, new Int32(66));
    results.push(Read(Int32, handler, ADDRESS).equals(new Int32(66)));

    Write(handler, ADDRESS, new Float(123.213));
    results.push(Read(Float, handler, ADDRESS).equals(new Float(123.213)));

    Write(handler, ADDRESS, new Double(2135.1235));
    results.push(Read(Double, handler, ADDRESS).equals(new Double(2135.1235)));

    expect(results.every(result => result)).toEqual(true);
  } catch (e) {
    console.error(e);
  }
});
