export declare namespace MemoryTS {
  type HANDLE = unknown;
  type HMODULE = unknown;

  export type ProcessHandle = import('@memoryts/base').ExternalObject<HANDLE>;
  export type ModuleHandle = import('@memoryts/base').ExternalObject<HMODULE>;

  export type ProcessInfo = {
    name: string;
    pid: number;
  };

  export type MemoryAddress = number;

  export enum ProtectionLevel {
    PAGE_EXECUTE = 0x10,
    PAGE_EXECUTE_READ = 0x20,
    PAGE_EXECUTE_READWRITE = 0x40,
    PAGE_EXECUTE_WRITECOPY = 0x80,
    PAGE_NOACCESS = 0x01,
    PAGE_READONLY = 0x02,
    PAGE_READWRITE = 0x04,
    PAGE_WRITECOPY = 0x08,
    PAGE_TARGETS_INVALID = 0x40000000,
    PAGE_TARGETS_NO_UPDATE = 0x40000000,
    PAGE_GUARD = 0x100,
    PAGE_NOCACHE = 0x200,
    PAGE_WRITECOMBINE = 0x400,
  }

  export class ModuleEntry32 {
    dwSize: number;
    th32ModuleId: number;
    th32ProcessId: number;
    glblcntUsage: number;
    proccntUsage: number;
    modBaseAddr: number;
    modBaseSize: number;
    szModule: string;
    szExePath: string;
  }
}
