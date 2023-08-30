// TODO: create tests

import { GetModuleHandle, GetModuleInfo, ListModules } from '../src/module';
import { OpenProcess } from '../src/process';

// modify timeout to 10 minutes
jest.setTimeout(600000);
const PROCESS_NAME = 'notepad.exe';

describe('module information', () => {
  test('Get module handle', () => {
    const handle = GetModuleHandle(PROCESS_NAME, 'textinputframework.dll');

    expect(handle).not.toBeUndefined();
  });

  test('Get module handle with invalid module name', () => {
    expect(() => GetModuleHandle(PROCESS_NAME, 'invalid.dll')).toThrow();
  });

  test('Get all process modules when invalid pid', () => {
    expect(() => ListModules(-1)).toThrow();
  });

  test('Get all process modules', () => {
    const modules = ListModules(0);

    expect(modules).not.toBeUndefined();
    expect(modules.length).toBeGreaterThan(0);
  });

  test('Get module information', () => {
    const processHandle = OpenProcess(PROCESS_NAME);
    const moduleHandle = GetModuleHandle(PROCESS_NAME, PROCESS_NAME);

    const info = GetModuleInfo(processHandle, moduleHandle);

    expect(info).not.toBeUndefined();
  });

  test('Get module information with invalid process handle', () => {
    const moduleHandle = GetModuleHandle(PROCESS_NAME, PROCESS_NAME);

    expect(() => GetModuleInfo(-1, moduleHandle)).toThrow();
  });

  test('Get module information with invalid module handle', () => {
    const processHandle = OpenProcess(PROCESS_NAME);

    expect(() => GetModuleInfo(processHandle, -1)).toThrow();
  });

  test('Get module information with invalid process and module handle', () => {
    expect(() => GetModuleInfo(-1, -1)).toThrow();
  });
});
