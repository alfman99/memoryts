import base from '@memoryts/base';
import { DataType, DataTypeConstructor, TArray } from './memoryTypes';
import { MemoryTS } from './typings';

export function Read<
  T extends DataType<U>,
  U extends string | number | bigint | boolean
>(
  constructor: DataTypeConstructor<T>,
  processHandler: MemoryTS.ProcessHandle,
  address: MemoryTS.MemoryAddress
): T {
  const itemType = constructor;
  const bytesOfType = new itemType().rawBuffer.length;

  const buffer = base.readBuffer(processHandler, address, bytesOfType);

  return new itemType(Uint8Array.from(buffer));
}

export function ReadArray<
  T extends DataType<U>,
  U extends string | number | bigint | boolean
>(
  constructor: DataTypeConstructor<T>,
  length: number,
  processHandler: MemoryTS.ProcessHandle,
  address: MemoryTS.MemoryAddress
): TArray<T, U> {
  const retVal = new Array(length);
  const bytesOfType = new constructor().rawBuffer.length;
  const bytesToRead = bytesOfType * length;

  const buffer = base.readBuffer(processHandler, address, bytesToRead);

  for (let i = 0; i < length; i++) {
    const itemBuffer = buffer.slice(i * bytesOfType, (i + 1) * bytesOfType);
    retVal[i] = new constructor(itemBuffer);
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return new TArray(constructor, length, retVal);
}

export function Write<
  T extends DataType<U>,
  U extends string | number | bigint | boolean
>(
  value: T,
  processHandler: MemoryTS.ProcessHandle,
  address: MemoryTS.MemoryAddress
): void {
  return base.writeBuffer(processHandler, address, value.rawBuffer);
}

export function WriteArray<
  T extends DataType<U>,
  U extends string | number | bigint | boolean
>(
  values: T[] | TArray<T, U>,
  processHandler: MemoryTS.ProcessHandle,
  address: MemoryTS.MemoryAddress
): void {
  if (values instanceof TArray) {
    return base.writeBuffer(processHandler, address, values.rawBuffer);
  } else {
    return base.writeBuffer(
      processHandler,
      address,
      Buffer.concat(values.map(v => v.rawBuffer))
    );
  }
}

export default {
  Read,
  ReadArray,
  Write,
  WriteArray,
};
