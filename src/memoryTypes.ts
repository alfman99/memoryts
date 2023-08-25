import { ResizeBuffer } from './util';

export abstract class DataType<U extends number | bigint | string | boolean> {
  protected _buffer!: Buffer;

  constructor(value?: U | U[] | Uint8Array | Buffer) {
    if (Buffer.isBuffer(value)) {
      this._buffer = value;
    } else if (value instanceof Uint8Array) {
      this._buffer = Buffer.from(value);
    } else if (Array.isArray(value)) {
      if (value.length > 0) {
        if (typeof value[0] === 'number') this._buffer = Buffer.from(value);
      }
    }
  }

  // Returns the raw bytes of the value
  public get rawBuffer(): Buffer {
    return this._buffer;
  }

  public equals(other: DataType<U>): boolean {
    return this._buffer.equals(other.rawBuffer);
  }

  // Representation of the bytes in human readable format
  abstract get value(): U | U[] | { [key: string]: U | U[] };
}

export abstract class OneByte extends DataType<string | boolean | number> {
  constructor(value?: any) {
    super(value);

    if (!Buffer.isBuffer(value) && !(value instanceof Uint8Array))
      // If value is not a buffer or Uint8Array
      // Means that it is a value to be written
      // So we allocate a buffer of 1 byte
      // so that we can write the value to it later
      this._buffer = Buffer.alloc(1);
    else {
      // If it is a buffer or Uint8Array
      // Means that it is a value to be read
      // So we resize the buffer to 1 byte so in case the buffer / Uint8Array is bigger or smaller
      // than 1 byte, we can resize it to 1 byte
      this._buffer = ResizeBuffer(this._buffer, 1);
    }
  }
  abstract get value(): string | boolean | number;
}

export abstract class TwoBytes extends DataType<number> {
  constructor(value?: any) {
    super(value);
    if (!Buffer.isBuffer(value) && !(value instanceof Uint8Array))
      this._buffer = Buffer.alloc(2);
    else {
      this._buffer = ResizeBuffer(this._buffer, 2);
    }
  }
  abstract get value(): number;
}

export abstract class FourBytes extends DataType<number> {
  constructor(value?: any) {
    super(value);
    if (!Buffer.isBuffer(value) && !(value instanceof Uint8Array))
      this._buffer = Buffer.alloc(4);
    else {
      this._buffer = ResizeBuffer(this._buffer, 4);
    }
  }
  abstract get value(): number;
}

export abstract class EightBytes extends DataType<number | bigint> {
  constructor(value?: any) {
    super(value);
    if (!Buffer.isBuffer(value) && !(value instanceof Uint8Array))
      this._buffer = Buffer.alloc(8);
    else {
      this._buffer = ResizeBuffer(this._buffer, 8);
    }
  }
  abstract get value(): number | bigint;
}

export class Bool extends OneByte {
  constructor(value?: boolean | Uint8Array | Buffer) {
    super(value);
    if (typeof value === 'boolean') {
      this._buffer.writeUInt8(value ? 1 : 0);
    }
  }
  override get value(): boolean {
    return this._buffer[0] & 1 ? true : false;
  }
}

export class Int8 extends OneByte {
  constructor(value?: number | Uint8Array | Buffer) {
    super(value);
    if (typeof value === 'number') {
      this._buffer.writeInt8(value);
    }
  }
  override get value(): number {
    return this._buffer.readInt8();
  }
}

export class Byte extends OneByte {
  constructor(value?: number | Uint8Array | Buffer) {
    super(value);
    if (typeof value === 'number') {
      this._buffer.writeUInt8(value);
    }
  }
  override get value(): number {
    return this._buffer.readUInt8();
  }
}

export class Char extends OneByte {
  constructor(value?: string | Uint8Array | Buffer) {
    super(value);
    if (typeof value === 'string') {
      this._buffer.write(value[0]);
    }
  }
  override get value(): string {
    return this._buffer.toString();
  }
}

export class UInt8 extends OneByte {
  constructor(value?: number | Uint8Array | Buffer) {
    super(value);
    if (typeof value === 'number') {
      this._buffer.writeUInt8(value);
    }
  }
  override get value(): number {
    return this._buffer.readUInt8();
  }
}

export class Int16 extends TwoBytes {
  constructor(value?: number | Uint8Array | Buffer) {
    super(value);
    if (typeof value === 'number') {
      this._buffer.writeInt16LE(value);
    }
  }
  override get value(): number {
    return this._buffer.readInt16LE();
  }
}

export class UInt16 extends TwoBytes {
  constructor(value?: number | Uint8Array | Buffer) {
    super(value);
    if (typeof value === 'number') {
      this._buffer.writeUInt16LE(value);
    }
  }
  override get value(): number {
    return this._buffer.readUInt16LE();
  }
}

export class Int32 extends FourBytes {
  constructor(value?: number | Uint8Array | Buffer) {
    super(value);
    if (typeof value === 'number') {
      this._buffer.writeInt32LE(value);
    }
  }
  override get value(): number {
    return this._buffer.readInt32LE();
  }
}

export class UInt32 extends FourBytes {
  constructor(value?: number | Uint8Array | Buffer) {
    super(value);
    if (typeof value === 'number') {
      this._buffer.writeUInt32LE(value);
    }
  }
  override get value(): number {
    return this._buffer.readUInt32LE();
  }
}

export class Int64 extends EightBytes {
  constructor(value?: number | bigint | Uint8Array | Buffer) {
    super(value);
    if (typeof value === 'number') {
      value = BigInt(value);
    }
    if (typeof value === 'bigint') {
      this._buffer.writeBigInt64LE(value);
    } else if (Array.isArray(value)) {
      if (value.length > 0) {
        if (typeof value[0] === 'bigint') {
          for (let i = 0; i < value.length; i++) {
            this._buffer.writeBigInt64LE(BigInt(value[i]), i * 8);
          }
        }
      }
    }
  }
  override get value(): bigint {
    return this._buffer.readBigInt64LE();
  }
}

export class UInt64 extends EightBytes {
  constructor(value?: number | bigint | Uint8Array | Buffer) {
    super(value);
    if (typeof value === 'number') {
      value = BigInt(value);
    }
    if (typeof value === 'bigint') {
      this._buffer.writeBigUInt64LE(value);
    } else if (Array.isArray(value)) {
      if (value.length > 0) {
        if (typeof value[0] === 'bigint') {
          for (let i = 0; i < value.length; i++) {
            this._buffer.writeBigUint64LE(BigInt(value[i]), i * 8);
          }
        }
      }
    }
  }
  override get value(): bigint {
    return this._buffer.readBigUInt64LE();
  }
}

export class Float extends FourBytes {
  constructor(value?: number | Uint8Array | Buffer) {
    super(value);
    if (typeof value === 'number') {
      this._buffer.writeFloatLE(value);
    }
  }
  override get value(): number {
    return this._buffer.readFloatLE();
  }
}

export class Double extends EightBytes {
  constructor(value?: number | Uint8Array | Buffer) {
    super(value);
    if (typeof value === 'number') {
      this._buffer.writeDoubleLE(value);
    }
  }
  override get value(): number {
    return this._buffer.readDoubleLE();
  }
}

export class TArray<
  T extends DataType<U>,
  U extends number | bigint | string | boolean
> extends DataType<U> {
  private _type: DataTypeConstructor<T>;
  private _length: number;

  constructor(type: DataTypeConstructor<T>, length: number, value: U[]) {
    super(value);
    this._type = type;
    this._length = length;
    // If value is an array of DataType
    // We concat the rawBuffer of each item in the array
    // If value is an array of number | bigint | string | boolean
    // We create a new instance of the type and concat the rawBuffer of each item in the array
    const tmp = value.map(v =>
      v instanceof this._type ? v.rawBuffer : new this._type(v).rawBuffer
    );
    this._buffer = Buffer.concat(tmp);
  }

  override get value(): U[] {
    const retVal: U[] = [];
    for (let i = 0; i < this._length; i++) {
      const itemBuffer = this._buffer.slice(
        i * new this._type().rawBuffer.length,
        (i + 1) * new this._type().rawBuffer.length
      );
      retVal[i] = new this._type(Uint8Array.from(itemBuffer)).value as U;
    }
    return retVal;
  }
}

// export class TStruct<
//   T extends { [key: string]: DataType<U> },
//   U extends number | bigint | string | boolean
// > extends DataType<U> {
//   private _type: { [key: string]: DataTypeConstructor<DataType<U>> };

//   constructor(
//     type: { [key: string]: DataTypeConstructor<DataType<U>> },
//     value: T
//   ) {
//     super();
//     this._type = type;
//     const tmp: Buffer[] = [];
//     for (const key in value) {
//       if (type[key] !== TStruct) {
//         tmp.push(new type[key](value[key]).rawBuffer);
//       } else {
//         console.error('[Constructor] Nested TStruct not supported yet');
//       }
//     }
//     this._buffer = Buffer.concat(tmp);
//   }

//   override get value(): { [key: string]: U | U[] } {
//     const retVal: { [key: string]: U | U[] } = {};
//     let offset = 0;
//     for (const key in this._type) {
//       const itemBuffer = this._buffer.slice(
//         offset,
//         offset + new this._type[key]().rawBuffer.length
//       );
//       retVal[key] = new this._type[key](Uint8Array.from(itemBuffer)).value as
//         | U
//         | U[];

//       offset += new this._type[key]().rawBuffer.length;
//     }
//     return retVal;
//   }
// }

export type DataTypeConstructor<
  T extends DataType<number | bigint | string | boolean>
> = new (...args: any[]) => T;
