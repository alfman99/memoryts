import { PatternScanning } from '../src/patternScanning';
import { OpenProcess } from '../src/process';

// modify timeout to 10 minutes
jest.setTimeout(600000);
const PROCESS_NAME = 'notepad.exe';

describe('patternscanning module', () => {
  test('Get module handle', () => {
    const handle = OpenProcess(PROCESS_NAME);

    const addr = PatternScanning(handle, '69 69 69', 0x0, 0x9999);

    console.log(addr);
  });
});
