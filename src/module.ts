import {
  JSMODULEENTRY32,
  Jslpmoduleinfo,
  getModuleHandle,
  getModuleInformation,
  getProcessModuleEntry32,
  listProcessModules,
  processHandleToName,
  processHandleToPid,
  processPidToName,
} from '../../base-memoryts';

export function FindModule(
  process: ProcessHandle,
  module_name: string
): JSMODULEENTRY32 {
  process = processHandleToName(process);
  return getProcessModuleEntry32(process, module_name);
}

export function ListModules(process: ProcessHandle): Array<JSMODULEENTRY32> {
  process = processHandleToPid(process);
  return listProcessModules(process);
}

export function GetModuleHandle(
  process: ProcessHandle,
  module_name: string
): ModuleHandle {
  process = processHandleToPid(process);
  process = processPidToName(process);

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
