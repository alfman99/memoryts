import base from '../../base-memoryts';

export function Architecture(): 'x64' | 'x32' {
  return base.is64BitProcess() ? 'x64' : 'x32';
}

export function RunningPrivileged(): boolean {
  return base.isElevatedProcess();
}

export default {
  Architecture,
  RunningPrivileged,
};
