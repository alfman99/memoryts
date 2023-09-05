import base from '@memoryts/base';

export function PatternScanning(
  process: ProcessHandle,
  pattern: string,
  from_addr: MemoryAddress,
  to_addr: MemoryAddress
): MemoryAddress {
  return base.patternScan(process, pattern, from_addr, to_addr);
}

export default { PatternScanning };
