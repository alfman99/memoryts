import base from '@memoryts/base';
import { DataTypeConstructor, DataType, TArray } from './memoryTypes';

export function read<T extends DataType>(
  constructor: DataTypeConstructor<T>,
  processHandler: base.ExternalObject<HANDLE>,
  address: number
): T {
  const data = new constructor();
  const buffer = base.readBuffer(processHandler, address, data.byteSize);
  data.setBuffer(buffer);
  return data;
}

export function readArray<T extends DataType>(
  dataType: [DataTypeConstructor<T>, number],
  processHandler: base.ExternalObject<any>,
  address: number
): TArray<T> {
  const [itemType, length] = dataType;
  const array = new TArray(itemType, length);
  const buffer = base.readBuffer(processHandler, address, array.size);
  array.setBuffer(buffer);
  return array;
}

export default {
  read,
};
