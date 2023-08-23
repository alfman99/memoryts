import base from '../../base-memoryts';
import { DataType, DataTypeConstructor } from './memoryTypes';

export function Read<T extends DataType>(
  constructor: DataTypeConstructor<T>,
  processHandler: Handle,
  address: MemoryAddress
): T {
  const itemType = constructor;
  const bytesOfType = new itemType().rawBuffer.length;

  const buffer = base.readBuffer(processHandler, address, bytesOfType);

  return new itemType(Uint8Array.from(buffer));
}

export function ReadArray<T extends DataType>(
  constructor: [DataTypeConstructor<T>, number],
  processHandler: Handle,
  address: MemoryAddress
): T[] {
  const [itemType, length] = constructor;
  const retVal = new Array(length);
  const bytesOfType = new itemType().rawBuffer.length;
  const bytesToRead = bytesOfType * length;

  const buffer = base.readBuffer(processHandler, address, bytesToRead);

  for (let i = 0; i < length; i++) {
    const itemBuffer = buffer.slice(i * bytesOfType, (i + 1) * bytesOfType);
    retVal[i] = new itemType(Uint8Array.from(itemBuffer));
  }

  return retVal;
}

export function Write<T extends DataType>(
  processHandler: Handle,
  address: MemoryAddress,
  value: T
): void {
  return base.writeBuffer(processHandler, address, value.rawBuffer);
}

export function WriteArray<T extends DataType>(
  processHandler: Handle,
  address: MemoryAddress,
  values: T[]
): void {
  return base.writeBuffer(
    processHandler,
    address,
    Buffer.concat(values.map(v => v.rawBuffer))
  );
}

export default {
  Read,
  ReadArray,
  Write,
  WriteArray,
};
