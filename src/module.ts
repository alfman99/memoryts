import { JSMODULEENTRY32, getModule, listModules } from '../../base-memoryts';

export function FindModule(
  process_name: string,
  module_name: string
): JSMODULEENTRY32 {
  return getModule(process_name, module_name);
}

export function ListModules(process_pid: number): Array<JSMODULEENTRY32> {
  return listModules(process_pid);
}

export default {
  FindModule,
  ListModules,
};
