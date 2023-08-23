import base from '../../base-memoryts';

export function OpenProcess(process: string | number): Handle {
  if (typeof process === 'string') {
    return base.openProcessName(process);
  } else if (typeof process === 'number') {
    return base.openProcessPid(process);
  } else {
    throw new Error('Invalid type for process');
  }
}

export function GetProcessesRunning(): ProcessInfo[] {
  return base.listAllRunningProcesses().map(process => ({
    name: process.szExeFile,
    pid: process.th32ProcessId,
  }));
}

export function CloseProcess(process: Handle): void {
  base.closeProcess(process);
}

export default {
  OpenProcess,
  GetProcessesRunning,
  CloseProcess,
};
