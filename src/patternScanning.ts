import base from '@memoryts/base';
import { MemoryTS } from './typings';

export function PatternScanning(
  process: MemoryTS.ProcessHandle,
  pattern: string,
  from_addr: MemoryTS.MemoryAddress,
  to_addr: MemoryTS.MemoryAddress
): MemoryTS.MemoryAddress {
  return base.patternScan(process, pattern, from_addr, to_addr);
}

export default { PatternScanning };
