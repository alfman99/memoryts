import {
  Jslpmoduleinfo,
  getModuleHandle,
  getModuleInformation,
  getProcessModuleEntry32,
  listProcessModules,
  processHandleToName,
  processHandleToPid,
  processPidToName,
} from '@memoryts/base';
import { MemoryTS } from './typings';

export function FindModule(
  process: MemoryTS.ProcessHandle,
  module_name: string
): MemoryTS.ModuleEntry32 {
  const processName = processHandleToName(process);
  const entry = getProcessModuleEntry32(processName, module_name);
  return {
    dwSize: entry.dwSize,
    th32ModuleId: entry.th32ModuleId,
    th32ProcessId: entry.th32ProcessId,
    glblcntUsage: entry.glblcntUsage,
    proccntUsage: entry.proccntUsage,
    modBaseAddr: entry.modBaseAddr,
    modBaseSize: entry.modBaseSize,
    szModule: entry.szModule,
    szExePath: entry.szExePath,
  };
}

export function ListModules(
  process: MemoryTS.ProcessHandle
): Array<MemoryTS.ModuleEntry32> {
  const processPid = processHandleToPid(process);
  const entries = listProcessModules(processPid);
  return entries.map(entry => ({
    dwSize: entry.dwSize,
    th32ModuleId: entry.th32ModuleId,
    th32ProcessId: entry.th32ProcessId,
    glblcntUsage: entry.glblcntUsage,
    proccntUsage: entry.proccntUsage,
    modBaseAddr: entry.modBaseAddr,
    modBaseSize: entry.modBaseSize,
    szModule: entry.szModule,
    szExePath: entry.szExePath,
  }));
}

export function GetModuleHandle(
  process: MemoryTS.ProcessHandle,
  module_name: string
): MemoryTS.ModuleHandle {
  const processPid = processHandleToPid(process);
  const processName = processPidToName(processPid);

  return getModuleHandle(processName, module_name);
}

export function GetModuleInfo(
  process_handle: MemoryTS.ProcessHandle,
  module_handle: MemoryTS.ModuleHandle
): Jslpmoduleinfo {
  return getModuleInformation(process_handle, module_handle);
}

export default {
  FindModule,
  ListModules,
  GetModuleHandle,
  GetModuleInfo,
};
