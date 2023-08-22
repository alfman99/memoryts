import { resizeBuffer } from './util';

export abstract class DataType {
  protected _buffer: Buffer;

  constructor(value?: Uint8Array) {
    this._buffer = Buffer.from(!value ? [] : value);
  }

  public get rawValue(): Buffer {
    return this._buffer;
  }

  public get size(): number {
    return this._buffer.length;
  }

  abstract get value(): number | boolean | string;
}

export class Bit extends DataType {
  constructor(value?: Uint8Array) {
    super(value);
    if (!value) {
      this._buffer = Buffer.alloc(1);
    } else {
      this._buffer = resizeBuffer(this._buffer, 1);
    }
  }
  override get value(): number {
    return this._buffer[0] & 1;
  }
}

export class Bool extends DataType {
  constructor(value?: Uint8Array) {
    super(value);
    if (!value) {
      this._buffer = Buffer.alloc(1);
    } else {
      this._buffer = resizeBuffer(this._buffer, 1);
    }
  }
  override get value(): boolean {
    return (this._buffer[0] & 1) === 1;
  }
}

export class Char extends DataType {
  constructor(value?: Uint8Array) {
    super(value);
    if (!value) {
      this._buffer = Buffer.alloc(1);
    } else {
      this._buffer = resizeBuffer(this._buffer, 1);
    }
  }
  override get value(): string {
    return String.fromCharCode(this._buffer[0]);
  }
}

export class Short extends DataType {
  constructor(value?: Uint8Array) {
    super(value);
    if (!value) {
      this._buffer = Buffer.alloc(2);
    } else {
      this._buffer = resizeBuffer(this._buffer, 2);
    }
  }
  override get value(): number {
    return (this._buffer[1] << 8) | (this._buffer[0] << 0);
  }
}

export class Int8 extends DataType {
  constructor(value?: Uint8Array) {
    super(value);
    if (!value) {
      this._buffer = Buffer.alloc(1);
    } else {
      this._buffer = resizeBuffer(this._buffer, 1);
    }
  }
  override get value(): number {
    return this._buffer.readInt8();
  }
}

export class Int16 extends DataType {
  constructor(value?: Uint8Array) {
    super(value);
    if (!value) {
      this._buffer = Buffer.alloc(2);
    } else {
      this._buffer = resizeBuffer(this._buffer, 2);
    }
  }
  override get value(): number {
    return this._buffer.readInt16LE();
  }
}

export class Int32 extends DataType {
  constructor(value?: Uint8Array) {
    super(value);
    if (!value) {
      this._buffer = Buffer.alloc(4);
    } else {
      this._buffer = resizeBuffer(this._buffer, 4);
    }
  }
  override get value(): number {
    return this._buffer.readInt32LE();
  }
}

export class UInt8 extends DataType {
  constructor(value?: Uint8Array) {
    super(value);
    if (!value) {
      this._buffer = Buffer.alloc(1);
    } else {
      this._buffer = resizeBuffer(this._buffer, 1);
    }
  }
  override get value(): number {
    return this._buffer.readUInt8();
  }
}

export class UInt16 extends DataType {
  constructor(value?: Uint8Array) {
    super(value);
    if (!value) {
      this._buffer = Buffer.alloc(2);
    } else {
      this._buffer = resizeBuffer(this._buffer, 2);
    }
  }
  override get value(): number {
    return this._buffer.readUInt16LE();
  }
}

export class UInt32 extends DataType {
  constructor(value?: Uint8Array) {
    super(value);
    if (!value) {
      this._buffer = Buffer.alloc(4);
    } else {
      this._buffer = resizeBuffer(this._buffer, 4);
    }
  }
  override get value(): number {
    return this._buffer.readUInt32LE();
  }
}

export class Float extends DataType {
  constructor(value?: Uint8Array) {
    super(value);
    if (!value) {
      this._buffer = Buffer.alloc(4);
    } else {
      this._buffer = resizeBuffer(this._buffer, 4);
    }
  }
  override get value(): number {
    return this._buffer.readFloatLE();
  }
}

export class Double extends DataType {
  constructor(value?: Uint8Array) {
    super(value);
    if (!value) {
      this._buffer = Buffer.alloc(8);
    } else {
      this._buffer = resizeBuffer(this._buffer, 8);
    }
  }
  override get value(): number {
    return this._buffer.readDoubleLE();
  }
}

export type DataTypeConstructor<T extends DataType> = new (...args: any[]) => T;
