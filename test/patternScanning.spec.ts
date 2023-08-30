import { PatternScanning } from '../src/patternScanning';

// modify timeout to 10 minutes
jest.setTimeout(600000);
const PROCESS_NAME = 'notepad.exe';

describe('patternscanning module', () => {
  test('Get module handle', () => {
    PatternScanning();
  });
});
