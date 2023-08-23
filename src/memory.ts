import base from '@memoryts/base';
import { DataTypeConstructor, DataType } from './memoryTypes';

export function read<T extends DataType>(
  constructor: DataTypeConstructor<T> | [DataTypeConstructor<T>, number],
  processHandler: base.ExternalObject<HANDLE>,
  address: number
): T | T[] {
  let itemType: DataTypeConstructor<T>;
  let length = 1;
  let retVal: T | T[];
  let bytesToRead: number;

  if (Array.isArray(constructor)) {
    [itemType, length] = constructor;
    retVal = new Array(length);
    bytesToRead = retVal[0].rawBuffer.length * length;
  } else {
    itemType = constructor;
    retVal = new itemType();
    bytesToRead = retVal.rawBuffer.length;
  }

  const buffer = base.readBuffer(processHandler, address, bytesToRead);

  if (Array.isArray(retVal)) {
    for (let i = 0; i < length; i++) {
      const item = retVal[i];
      const itemBuffer = buffer.slice(
        i * item.rawBuffer.length,
        (i + 1) * item.rawBuffer.length
      );
      retVal[i] = new itemType(Uint8Array.from(itemBuffer));
    }
  } else {
    retVal = new itemType(Uint8Array.from(buffer));
  }

  return retVal;
}

export function write<T extends DataType>(
  processHandler: base.ExternalObject<HANDLE>,
  address: number,
  value: T | T[]
): void {
  if (Array.isArray(value)) {
    value.map((v, i) => {
      base.writeBuffer(
        processHandler,
        address + i * v.rawBuffer.length,
        v.rawBuffer
      );
    });
  } else {
    base.writeBuffer(processHandler, address, value.rawBuffer);
  }
}

export default {
  read,
};
