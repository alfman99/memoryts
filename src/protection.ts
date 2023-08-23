import base from '../../base-memoryts';
import { ProtectionLevel } from './protectionLevels';

export function SetProtectionLevel(
  process_handler: base.ExternalObject<Handle>,
  address: MemoryAddress,
  size: number,
  protection: ProtectionLevel
): ProtectionLevel {
  return base.setProtection(process_handler, address, size, protection);
}

export default {
  SetProtectionLevel,
};
