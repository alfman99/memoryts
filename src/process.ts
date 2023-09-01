import base from '../../base-memoryts';

export function OpenProcess(process: string | number): ProcessHandle {
  let processHandle: ProcessHandle;
  if (typeof process === 'string') {
    processHandle = base.openProcessName(process);
  } else if (typeof process === 'number') {
    processHandle = base.openProcessPid(process);
  }

  // Check if process is same architecture as the current process
  const myProcessIsX64 = base.is64BitProcess();
  if (base.isProcessX64(processHandle)) {
    if (myProcessIsX64) {
      return processHandle;
    } else {
      throw new Error('Cannot open x64 external process from x32 process');
    }
  } else {
    if (myProcessIsX64) {
      throw new Error('Cannot open x32 external process from x64 process');
    } else {
      return processHandle;
    }
  }
}

export function GetProcessesRunning(): ProcessInfo[] {
  return base.listAllRunningProcesses().map(process => ({
    name: process.szExeFile,
    pid: process.th32ProcessId,
  }));
}

export function CloseProcess(process: ProcessHandle): void {
  base.closeProcess(process);
}

export default {
  OpenProcess,
  GetProcessesRunning,
  CloseProcess,
};
