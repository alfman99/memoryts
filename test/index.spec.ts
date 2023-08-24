import { Read, Write } from '../src/memory';
import {
  Bool,
  Byte,
  Char,
  Double,
  Float,
  Int16,
  Int32,
  Int8,
  UInt16,
  UInt32,
  UInt8,
} from '../src/memoryTypes';
import { FindModule } from '../src/module';
import { OpenProcess } from '../src/process';
import { Architecture, RunningPrivileged } from '../src/util';

const PROCESS_NAME = 'Notepad.exe';

test('check architecture', () => {
  expect(process.arch).toEqual(Architecture());
});

test('check if running privileged', () => {
  expect(RunningPrivileged()).toEqual(true);
});

// test('read string utf16le', () => {
//   const processHandle = OpenProcess('Notepad.exe');
//   const charArray = ReadArray([Char, 20], processHandle, 0x7ff8c48f3930);
//   console.log(charArray.rawBuffer.toString('utf16le'));
// });

test('calculate static pointer from module (textinputframework.dll) and read and write all datatypes', () => {
  try {
    const moduleInfo = FindModule(PROCESS_NAME, 'textinputframework.dll');
    const offset = 0x133930;
    const ADDRESS = moduleInfo.modBaseAddr + offset;

    const handler = OpenProcess(PROCESS_NAME);

    const results: boolean[] = [];

    Write(handler, ADDRESS, new Bool(false));
    results.push(Read(Bool, handler, ADDRESS).value === new Bool(false).value);

    Write(handler, ADDRESS, new Byte(0x55));
    results.push(Read(Byte, handler, ADDRESS).value === new Byte(0x55).value);

    Write(handler, ADDRESS, new Char('🥸'));
    results.push(Read(Char, handler, ADDRESS).value === new Char('🥸').value);

    Write(handler, ADDRESS, new Int8(-6));
    results.push(Read(Int8, handler, ADDRESS).value === new Int8(-6).value);

    Write(handler, ADDRESS, new UInt8(6));
    results.push(Read(UInt8, handler, ADDRESS).value === new UInt8(6).value);

    Write(handler, ADDRESS, new Int16(-234));
    results.push(Read(Int16, handler, ADDRESS).value === new Int16(-234).value);

    Write(handler, ADDRESS, new UInt16(234));
    results.push(
      Read(UInt16, handler, ADDRESS).value === new UInt16(234).value
    );

    Write(handler, ADDRESS, new Int32(-66));
    results.push(Read(Int32, handler, ADDRESS).value === new Int32(-66).value);

    Write(handler, ADDRESS, new UInt32(66));
    results.push(Read(UInt32, handler, ADDRESS).value === new UInt32(66).value);

    Write(handler, ADDRESS, new Float(123.213));
    results.push(
      Read(Float, handler, ADDRESS).value === new Float(123.213).value
    );

    Write(handler, ADDRESS, new Double(2135.1235));
    results.push(
      Read(Double, handler, ADDRESS).value === new Double(2135.1235).value
    );

    expect(results.every(result => result)).toEqual(true);
  } catch (e) {
    console.error(e);
  }
});
