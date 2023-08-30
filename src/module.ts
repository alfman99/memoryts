import {
  JSLPMODULEINFO,
  JSMODULEENTRY32,
  getModuleHandle,
  getModuleInformation,
  getProcessModuleEntry32,
  listProcessModules,
} from '../../base-memoryts';

export function FindModule(
  process_name: string,
  module_name: string
): JSMODULEENTRY32 {
  return getProcessModuleEntry32(process_name, module_name);
}

export function ListModules(process_pid: number): Array<JSMODULEENTRY32> {
  return listProcessModules(process_pid);
}

export function GetModuleHandle(
  process_name: string,
  module_name: string
): ModuleHandle {
  return getModuleHandle(process_name, module_name);
}

export function GetModuleInfo(
  process_handle: Handle,
  module_handle: ModuleHandle
): JSLPMODULEINFO {
  return getModuleInformation(process_handle, module_handle);
}

export default {
  FindModule,
  ListModules,
  GetModuleHandle,
  GetModuleInfo,
};
