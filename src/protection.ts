import base from '@memoryts/base';
import { MemoryTS } from './typings';

export function SetProtectionLevel(
  process: MemoryTS.ProcessHandle,
  address: MemoryTS.MemoryAddress,
  size: number,
  protection: MemoryTS.ProtectionLevel
): MemoryTS.ProtectionLevel {
  return base.setProtection(process, address, size, protection);
}

export default {
  SetProtectionLevel,
};
