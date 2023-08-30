import base from '../../base-memoryts';

export function PatternScanning(
  processHandler: Handle,
  pattern: string,
  from_addr: MemoryAddress,
  to_addr: MemoryAddress
): MemoryAddress {
  return base.patternScan(processHandler, pattern, from_addr, to_addr);
}

export default { PatternScanning };
