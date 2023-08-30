type HANDLE = unknown;
type HMODULE = unknown;

type Handle = ExternalObject<HANDLE>;
type ModuleHandle = ExternalObject<HMODULE>;

type ProcessInfo = {
  name: string;
  pid: number;
};

type MemoryAddress = number;
