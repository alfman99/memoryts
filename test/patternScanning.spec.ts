import { FindModule } from '../src/module';
import { PatternScanning } from '../src/patternScanning';
import { OpenProcess } from '../src/process';

// modify timeout to 10 minutes
jest.setTimeout(600000);
const PROCESS_NAME = 'Notepad.exe';

describe('patternscanning module', () => {
  test('scan for no wildcards', () => {
    const handle = OpenProcess(PROCESS_NAME);

    const moduleInfo = FindModule(handle, 'textinputframework.dll');

    const addr = PatternScanning(
      handle,
      '00 00 00',
      moduleInfo.modBaseAddr,
      moduleInfo.modBaseAddr + moduleInfo.modBaseSize
    );

    console.log(addr);

    expect(addr).toBeDefined();
  });

  test('scan with wildcards', () => {
    const handle = OpenProcess(PROCESS_NAME);

    const moduleInfo = FindModule(handle, 'textinputframework.dll');

    const addr = PatternScanning(
      handle,
      '?? 33 ??',
      moduleInfo.modBaseAddr,
      moduleInfo.modBaseAddr + moduleInfo.modBaseSize
    );

    console.log(addr);

    expect(addr).toBeDefined();
  });
});
