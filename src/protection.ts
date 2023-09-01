import base from '../../base-memoryts';
import { ProtectionLevel } from './protectionLevels';

export function SetProtectionLevel(
  process: ProcessHandle,
  address: MemoryAddress,
  size: number,
  protection: ProtectionLevel
): ProtectionLevel {
  return base.setProtection(process, address, size, protection);
}

export default {
  SetProtectionLevel,
};
