import {
  FindModule,
  GetModuleHandle,
  GetModuleInfo,
  ListModules,
} from '../src/module';
import { OpenProcess } from '../src/process';

// modify timeout to 10 minutes
jest.setTimeout(600000);
const PROCESS_NAME = 'Notepad.exe';

describe('module information', () => {
  test('Get module handle', () => {
    const pHandle = OpenProcess(PROCESS_NAME);

    const handle = GetModuleHandle(pHandle, 'textinputframework.dll');

    expect(handle).not.toBeUndefined();
  });

  test('Get module handle with invalid module name', () => {
    expect(() => {
      const pHandle = OpenProcess(PROCESS_NAME);
      GetModuleHandle(pHandle, 'invalid.dll');
    }).toThrow();
  });

  test('Get all process modules with process handle', () => {
    const processHandle = OpenProcess(PROCESS_NAME);
    const modules = ListModules(processHandle);

    expect(modules).not.toBeUndefined();
    expect(modules.length).toBeGreaterThan(0);
  });

  test('Get all process modules with process name', () => {
    const pHandle = OpenProcess(PROCESS_NAME);
    const modules = ListModules(pHandle);

    expect(modules).not.toBeUndefined();
    expect(modules.length).toBeGreaterThan(0);
  });

  test('Get module handle from process handle', () => {
    const processHandle = OpenProcess(PROCESS_NAME);
    const handle = GetModuleHandle(processHandle, 'textinputframework.dll');

    expect(handle).not.toBeUndefined();
  });

  test('Get module information', () => {
    const pHandle = OpenProcess(PROCESS_NAME);
    const moduleHandle = GetModuleHandle(pHandle, PROCESS_NAME);

    const info = GetModuleInfo(pHandle, moduleHandle);

    expect(info).not.toBeUndefined();
  });

  test('find module', () => {
    const pHandle = OpenProcess(PROCESS_NAME);
    const moduleHandle = FindModule(pHandle, PROCESS_NAME);

    expect(moduleHandle).not.toBeUndefined();
  });
});
