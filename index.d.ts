type HANDLE = unknown;
type HMODULE = unknown;

type ProcessHandle = ExternalObject<HANDLE>;
type ModuleHandle = ExternalObject<HMODULE>;

type ProcessInfo = {
  name: string;
  pid: number;
};

type MemoryAddress = number;
