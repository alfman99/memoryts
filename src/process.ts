import base from '@memoryts/base';
import { MemoryTS } from './typings';

export function OpenProcess(process: string | number): MemoryTS.ProcessHandle {
  let processHandle: MemoryTS.ProcessHandle;
  if (typeof process === 'string') {
    processHandle = base.openProcessName(process);
  } else {
    processHandle = base.openProcessPid(process);
  }

  // Check if process is same architecture as the current process
  const myProcessIsX64 = base.is64BitProcess();
  const targetProcessIsX64 = base.isProcessX64(processHandle);
  if (targetProcessIsX64) {
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

export function GetProcessesRunning(): MemoryTS.ProcessInfo[] {
  return base.listAllRunningProcesses().map(process => ({
    name: process.szExeFile,
    pid: process.th32ProcessId,
  }));
}

export function CloseProcess(process: MemoryTS.ProcessHandle): void {
  base.closeProcess(process);
}

export default {
  OpenProcess,
  GetProcessesRunning,
  CloseProcess,
};
