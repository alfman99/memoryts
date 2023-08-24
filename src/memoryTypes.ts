import { ResizeBuffer } from './util';

export abstract class DataType {
  protected _buffer!: Buffer;

  constructor(value?: any) {
    if (Buffer.isBuffer(value)) {
      this._buffer = value;
    } else if (value instanceof Uint8Array) {
      this._buffer = Buffer.from(value);
    }
  }

  // Returns the raw bytes of the value
  public get rawBuffer(): Buffer {
    return this._buffer;
  }

  public equals(other: DataType): boolean {
    return this._buffer.equals(other.rawBuffer);
  }

  // Representation of the bytes in human readable format
  abstract get value(): Buffer | number | string | boolean | DataType[];
}

export abstract class OneByte extends DataType {
  constructor(value?: any) {
    super(value);
    if (!Buffer.isBuffer(value) && !(value instanceof Uint8Array))
      this._buffer = Buffer.alloc(1);
    else {
      this._buffer = ResizeBuffer(this._buffer, 1);
    }
  }
  abstract get value(): any;
}

export abstract class TwoBytes extends DataType {
  constructor(value?: any) {
    super(value);
    if (!Buffer.isBuffer(value) && !(value instanceof Uint8Array))
      this._buffer = Buffer.alloc(2);
    else {
      this._buffer = ResizeBuffer(this._buffer, 2);
    }
  }
  abstract get value(): any;
}

export abstract class FourBytes extends DataType {
  constructor(value?: any) {
    super(value);
    if (!Buffer.isBuffer(value) && !(value instanceof Uint8Array))
      this._buffer = Buffer.alloc(4);
    else {
      this._buffer = ResizeBuffer(this._buffer, 4);
    }
  }
  abstract get value(): any;
}

export abstract class EightBytes extends DataType {
  constructor(value?: any) {
    super(value);
    if (!Buffer.isBuffer(value) && !(value instanceof Uint8Array))
      this._buffer = Buffer.alloc(8);
    else {
      this._buffer = ResizeBuffer(this._buffer, 8);
    }
  }
  abstract get value(): any;
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

// Other names for Int16
export class Short extends Int16 {}

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

// Other names for UInt16
export class UShort extends UInt16 {}

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

// Other names for Int32
export class Int extends Int32 {}
export class Long extends Int32 {}

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

// Other names for UInt32
export class UInt extends UInt32 {}
export class ULong extends UInt32 {}
export class DWord extends UInt32 {}

export class Float extends FourBytes {
  constructor(value?: number | Uint8Array | Buffer) {
    super(value);
    if (typeof value === 'number') {
      this._buffer = Buffer.alloc(4);
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
      this._buffer = Buffer.alloc(8);
      this._buffer.writeDoubleLE(value);
    }
  }
  override get value(): number {
    return this._buffer.readDoubleLE();
  }
}

export class Int64 extends EightBytes {
  constructor(value?: bigint | Uint8Array | Buffer) {
    super(value);
    if (typeof value === 'bigint') {
      this._buffer = Buffer.alloc(8);
      this._buffer.writeBigInt64LE(value);
    }
  }
  override get value(): bigint {
    return this._buffer.readBigInt64LE();
  }
}

// Other names for Int64
export class LongLong extends Int64 {}

export class UInt64 extends EightBytes {
  constructor(value?: bigint | Uint8Array | Buffer) {
    super(value);
    if (typeof value === 'bigint') {
      this._buffer = Buffer.alloc(8);
      this._buffer.writeBigUInt64LE(value);
    }
  }
  override get value(): bigint {
    return this._buffer.readBigUInt64LE();
  }
}

// Other names for UInt64
export class ULongLong extends UInt64 {}

export class TArray<T extends DataType> extends DataType {
  private _type: DataTypeConstructor<T>;
  private _length: number;

  constructor(type: [DataTypeConstructor<T>, number], value: T[]) {
    super(value);
    [this._type, this._length] = type;
    this._buffer = Buffer.concat(value.map(v => v.rawBuffer));
  }

  get value(): T[] {
    const result: T[] = [];
    for (let i = 0; i < this._length; i++) {
      const itemBuffer = this._buffer.slice(
        i * new this._type().rawBuffer.length,
        (i + 1) * new this._type().rawBuffer.length
      );
      result.push(new this._type(Uint8Array.from(itemBuffer)));
    }
    return result;
  }
}

export type DataTypeConstructor<T extends DataType> = new (...args: any[]) => T;
