import {
  JSMODULEENTRY32,
  Jslpmoduleinfo,
  getModuleHandle,
  getModuleInformation,
  getProcessModuleEntry32,
  listProcessModules,
  processHandleToName,
  processHandleToPid,
  processNameToPid,
  processPidToName,
} from '../../base-memoryts';

export function FindModule(
  process: string | number | ProcessHandle,
  module_name: string
): JSMODULEENTRY32 {
  if (typeof process === 'object') {
    process = processHandleToName(process);
  } else if (typeof process === 'number') {
    process = processPidToName(process);
  }

  return getProcessModuleEntry32(process, module_name);
}

export function ListModules(
  process: number | string | ProcessHandle
): Array<JSMODULEENTRY32> {
  // If process is a ProcessHandle, convert it to a pid
  if (typeof process === 'object') {
    process = processHandleToPid(process);
  } else if (typeof process === 'string') {
    // If process is a string, convert it to its pid
    process = processNameToPid(process);
  }

  return listProcessModules(process);
}

export function GetModuleHandle(
  process: string | number | ProcessHandle,
  module_name: string
): ModuleHandle {
  // If process is a ProcessHandle, convert it to a pid
  if (typeof process !== 'number' && typeof process !== 'string') {
    process = processHandleToPid(process);
  }

  // If process is a string, do nothing
  if (typeof process === 'string') {
    // Do nothing
  } else if (typeof process === 'number') {
    // If process is a number, convert it to its process name
    process = processPidToName(process);
  }

  return getModuleHandle(process, module_name);
}

export function GetModuleInfo(
  process_handle: ProcessHandle,
  module_handle: ModuleHandle
): Jslpmoduleinfo {
  return getModuleInformation(process_handle, module_handle);
}

export default {
  FindModule,
  ListModules,
  GetModuleHandle,
  GetModuleInfo,
};
