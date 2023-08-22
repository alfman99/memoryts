import base from '@memoryts/base';
import { DataTypeConstructor, DataType, TArray } from './memoryTypes';

export function read<T extends DataType>(
  constructor: DataTypeConstructor<T> | [DataTypeConstructor<T>, number],
  processHandler: base.ExternalObject<HANDLE>,
  address: number
): T | TArray<T> {
  let itemType: DataTypeConstructor<T>;
  let length = 1;
  let retVal: T | TArray<T>;

  if (Array.isArray(constructor)) {
    [itemType, length] = constructor;
    retVal = new TArray(itemType, length);
  } else {
    itemType = constructor;
    retVal = new itemType();
  }

  const buffer = base.readBuffer(processHandler, address, retVal.bufferSize);
  retVal.setBuffer(buffer);

  return retVal as TArray<T>;
}

export default {
  read,
};
