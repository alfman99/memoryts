import { Read, ReadArray, Write, WriteArray } from '../src/memory';
import {
  Bool,
  Double,
  Int16,
  Int32,
  Int64,
  Int8,
  TArray,
  UInt16,
  UInt32,
  UInt64,
  UInt8,
} from '../src/memoryTypes';
import { FindModule } from '../src/module';
import { OpenProcess } from '../src/process';

// modify timeout to 10 minutes
jest.setTimeout(600000);

describe('read/write memory Notepad.exe', () => {
  const PROCESS_NAME = 'Notepad.exe';
  const HANDLER = OpenProcess(PROCESS_NAME);
  const moduleInfo = FindModule(HANDLER, 'textinputframework.dll');
  const offset = 0x133930;
  const ADDRESS = moduleInfo.modBaseAddr + offset;

  describe('Bool/Bool[]', () => {
    test('Bool', () => {
      const value = false;
      Write(new Bool(value), HANDLER, ADDRESS);
      expect(Read(Bool, HANDLER, ADDRESS).value).toEqual(value);
    });

    test('Bool[]', () => {
      const value = [false, true, true, false, false, true];
      WriteArray(new TArray(Bool, value.length, value), HANDLER, ADDRESS);
      const readValue = ReadArray(Bool, value.length, HANDLER, ADDRESS).value;

      expect(readValue).toEqual(value);
    });
  });

  describe('Int8/Int8[]', () => {
    test('Int8', () => {
      const value = 127;
      Write(new Int8(value), HANDLER, ADDRESS);
      expect(Read(Int8, HANDLER, ADDRESS).value).toEqual(value);
    });

    test('Int8[]', () => {
      const value = [-5, 23, 6, -84, 122, 6];
      WriteArray(new TArray(Int8, value.length, value), HANDLER, ADDRESS);
      const readValue = ReadArray(Int8, value.length, HANDLER, ADDRESS).value;

      expect(readValue).toEqual(value);
    });
  });

  describe('UInt8/UInt8[]', () => {
    test('UInt8', () => {
      const value = 255;
      Write(new UInt8(value), HANDLER, ADDRESS);
      expect(Read(UInt8, HANDLER, ADDRESS).value).toEqual(value);
    });

    test('UInt8[]', () => {
      const value = [5, 23, 6, 8, 122, 6];
      WriteArray(new TArray(UInt8, value.length, value), HANDLER, ADDRESS);
      const readValue = ReadArray(UInt8, value.length, HANDLER, ADDRESS).value;

      expect(readValue).toEqual(value);
    });
  });

  describe('Int16/Int16[]', () => {
    test('Int16', () => {
      const value = 32767;
      Write(new Int16(value), HANDLER, ADDRESS);
      expect(Read(Int16, HANDLER, ADDRESS).value).toEqual(value);
    });

    test('Int16[]', () => {
      const value = [16123, -1512, 12363, -11236, 6234, 6734];
      WriteArray(new TArray(Int16, value.length, value), HANDLER, ADDRESS);
      const readValue = ReadArray(Int16, value.length, HANDLER, ADDRESS).value;

      expect(readValue).toEqual(value);
    });
  });

  describe('UInt16/UInt16[]', () => {
    test('UInt16', () => {
      const value = 65535;
      Write(new UInt16(value), HANDLER, ADDRESS);
      expect(Read(UInt16, HANDLER, ADDRESS).value).toEqual(value);
    });

    test('UInt16[]', () => {
      const value = [23946, 62372, 12363, 11236, 17612, 12346];
      WriteArray(new TArray(UInt16, value.length, value), HANDLER, ADDRESS);
      const readValue = ReadArray(UInt16, value.length, HANDLER, ADDRESS).value;

      expect(readValue).toEqual(value);
    });
  });

  describe('Int32/Int32[]', () => {
    test('Int32', () => {
      const value = 2_147_483_647;
      Write(new Int32(value), HANDLER, ADDRESS);
      expect(Read(Int32, HANDLER, ADDRESS).value).toEqual(value);
    });

    test('Int32[]', () => {
      const value = [2394652, -6237252, 1236352, -1123652, 1761252, -1234662];
      WriteArray(new TArray(Int32, value.length, value), HANDLER, ADDRESS);
      const readValue = ReadArray(Int32, value.length, HANDLER, ADDRESS).value;

      expect(readValue).toEqual(value);
    });
  });

  describe('UInt32/UInt32[]', () => {
    test('UInt32', () => {
      const value = 4_294_967_295;
      Write(new UInt32(value), HANDLER, ADDRESS);
      expect(Read(UInt32, HANDLER, ADDRESS).value).toEqual(value);
    });

    test('UInt32[]', () => {
      const value = [
        2394652235,
        237252235,
        236352235,
        1123652235,
        1761252235,
        1241234662,
      ];
      WriteArray(new TArray(UInt32, value.length, value), HANDLER, ADDRESS);
      const readValue = ReadArray(UInt32, value.length, HANDLER, ADDRESS).value;

      expect(readValue).toEqual(value);
    });
  });

  describe('Int64/Int64[]', () => {
    test('Int64', () => {
      const value = 4_294_967_295n;
      Write(new Int64(value), HANDLER, ADDRESS);
      expect(Read(Int64, HANDLER, ADDRESS).value).toEqual(value);
    });

    test('Int64[]', () => {
      const value = [
        2394652235n,
        237252235n,
        236352235n,
        1123652235n,
        1761252235n,
        1241234662n,
      ];
      WriteArray(new TArray(Int64, value.length, value), HANDLER, ADDRESS);
      const readValue = ReadArray(Int64, value.length, HANDLER, ADDRESS).value;

      expect(readValue).toEqual(value);
    });
  });

  describe('UInt64/UInt64[]', () => {
    test('UInt64', () => {
      const value = 4_294_967_295n;
      Write(new UInt64(value), HANDLER, ADDRESS);
      expect(Read(UInt64, HANDLER, ADDRESS).value).toEqual(value);
    });

    test('UInt64[]', () => {
      const value = [
        18_446_744_073_709_551_615n,
        237_252_235n,
        236_352_235n,
        1_123_652_235n,
        1_761_252_235n,
        1_241_234_662n,
      ];
      WriteArray(new TArray(UInt64, value.length, value), HANDLER, ADDRESS);
      const readValue = ReadArray(UInt64, value.length, HANDLER, ADDRESS).value;

      expect(readValue).toEqual(value);
    });
  });

  //   describe('Float/Float[]', () => {
  //     test('Float', () => {
  //       const value = 234.23452345;
  //       Write(new Float(value), HANDLER, ADDRESS);
  //       expect(Read(Float, HANDLER, ADDRESS).value).toEqual(value);
  //     });

  //     test('Float[]', () => {
  //       const value = [
  //         2345.23453, 2345234.3245, 234.2345, 324523.23452, 2347345.3224,
  //       ];
  //       WriteArray(new TArray(Float, value.length, value), HANDLER, ADDRESS);
  //       const readValue = ReadArray(Float, value.length, HANDLER, ADDRESS).value;

  //       expect(readValue).toEqual(value);
  //     });
  //   });

  describe('Double/Double[]', () => {
    test('Double', () => {
      const value = 481235.16847;
      Write(new Double(value), HANDLER, ADDRESS);
      expect(Read(Double, HANDLER, ADDRESS).value).toEqual(value);
    });

    test('Double[]', () => {
      const value = [
        481235.16847,
        123454234.2343246,
        13644.2332342,
        2346781.16847,
        2347231.16547,
        234.25478,
      ];
      WriteArray(new TArray(Double, value.length, value), HANDLER, ADDRESS);
      const readValue = ReadArray(Double, value.length, HANDLER, ADDRESS).value;

      expect(readValue).toEqual(value);
    });
  });
});

describe('initialize value outside of range', () => {
  test('Int8', () => {
    const value = 128;
    expect(() => new Int8(value)).toThrowError();
  });
  test('UInt8', () => {
    const value = -1;
    expect(() => new UInt8(value)).toThrowError();
  });
  test('Int16', () => {
    const value = 32768;
    expect(() => new Int16(value)).toThrowError();
  });
  test('UInt16', () => {
    const value = -1;
    expect(() => new UInt16(value)).toThrowError();
  });
  test('Int32', () => {
    const value = 2_147_483_648;
    expect(() => new Int32(value)).toThrowError();
  });
  test('UInt32', () => {
    const value = -1;
    expect(() => new UInt32(value)).toThrowError();
  });
  test('Int64', () => {
    const value = 9_223_372_036_854_775_808n;
    expect(() => new Int64(value)).toThrowError();
  });
  test('UInt64', () => {
    const value = -1n;
    expect(() => new UInt64(value)).toThrowError();
  });
  test('Float', () => {
    const value = Number.MAX_VALUE;
    expect(() => new Double(value)).toThrowError();
  });
  test('Double', () => {
    const value = Number.MAX_VALUE;
    expect(() => new Double(value)).toThrowError();
  });
});
