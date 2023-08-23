export abstract class DataType {
  protected _buffer!: Buffer;

  // Returns the raw bytes of the value
  public get rawBuffer(): Buffer {
    return this._buffer;
  }

  // Representation of the bytes in human readable format
  abstract get value(): Buffer | number | boolean | string;
}

export class Raw extends DataType {
  constructor(value?: Uint8Array) {
    super();
    if (value instanceof Uint8Array) {
      this._buffer = Buffer.from(value);
    } else {
      this._buffer = Buffer.alloc(1);
    }
  }
  override get value(): Buffer {
    return this._buffer;
  }
}

export class Bit extends DataType {
  constructor(value?: 1 | 0 | Uint8Array) {
    super();
    if (typeof value === 'number') {
      this._buffer = Buffer.alloc(1);
      this._buffer[0] = value;
    } else if (value instanceof Uint8Array) {
      this._buffer = Buffer.from(value);
    } else {
      this._buffer = Buffer.alloc(1);
    }
  }
  override get value(): 1 | 0 {
    return this._buffer[0] & 1 ? 1 : 0;
  }
}

export class Bool extends DataType {
  constructor(value?: boolean | Uint8Array) {
    super();
    if (typeof value === 'boolean') {
      this._buffer = Buffer.alloc(1);
      this._buffer[0] = value ? 1 : 0;
    } else if (value instanceof Uint8Array) {
      this._buffer = Buffer.from(value);
    } else {
      this._buffer = Buffer.alloc(1);
    }
  }
  override get value(): boolean {
    return this._buffer[0] === 1;
  }
}

// Will only read the first character
export class Char extends DataType {
  constructor(value?: string | Uint8Array) {
    super();
    if (typeof value === 'string') {
      this._buffer = Buffer.alloc(1);
      this._buffer[0] = value.charCodeAt(0);
    } else if (value instanceof Uint8Array) {
      this._buffer = Buffer.from(value);
    } else {
      this._buffer = Buffer.alloc(1);
    }
  }
  override get value(): string {
    return String.fromCharCode(this._buffer[0]);
  }
}

export class Short extends DataType {
  constructor(value?: number | Uint8Array) {
    super();
    if (typeof value === 'number') {
      if (value < -32768 || value > 32767)
        throw new Error('Short value must be between -32768 and 32767');
      this._buffer = Buffer.alloc(2);
      this._buffer.writeInt16LE(value);
    } else if (value instanceof Uint8Array) {
      this._buffer = Buffer.from(value);
    } else {
      this._buffer = Buffer.alloc(2);
    }
  }
  override get value(): number {
    return this._buffer.readInt16LE();
  }
}

export class Int8 extends DataType {
  constructor(value?: number | Uint8Array) {
    super();
    if (typeof value === 'number') {
      if (value < -128 || value > 127)
        throw new Error('Int8 value must be between -128 and 127');
      this._buffer = Buffer.alloc(1);
      this._buffer.writeInt8(value);
    } else if (value instanceof Uint8Array) {
      this._buffer = Buffer.from(value);
    } else {
      this._buffer = Buffer.alloc(1);
    }
  }
  override get value(): number {
    return this._buffer.readInt8();
  }
}

export class Int16 extends DataType {
  constructor(value?: number | Uint8Array) {
    super();
    if (typeof value === 'number') {
      if (value < -32768 || value > 32767)
        throw new Error('Int16 value must be between -32768 and 32767');

      this._buffer = Buffer.alloc(2);
      this._buffer.writeInt16LE(value);
    } else if (value instanceof Uint8Array) {
      this._buffer = Buffer.from(value);
    } else {
      this._buffer = Buffer.alloc(2);
    }
  }
  override get value(): number {
    return this._buffer.readInt16LE();
  }
}

export class Int32 extends DataType {
  constructor(value?: number | Uint8Array) {
    super();
    if (typeof value === 'number') {
      if (value < -2147483648 || value > 2147483647)
        throw new Error(
          'Int32 value must be between -2147483648 and 2147483647'
        );
      this._buffer = Buffer.alloc(4);
      this._buffer.writeInt32LE(value);
    } else if (value instanceof Uint8Array) {
      this._buffer = Buffer.from(value);
    } else {
      this._buffer = Buffer.alloc(4);
    }
  }
  override get value(): number {
    return this._buffer.readInt32LE();
  }
}

export class UInt8 extends DataType {
  constructor(value?: number | Uint8Array) {
    super();
    if (typeof value === 'number') {
      if (value < 0 || value > 255)
        throw new Error('UInt8 value must be between 0 and 255');
      this._buffer = Buffer.alloc(1);
      this._buffer.writeUInt8(value);
    } else if (value instanceof Uint8Array) {
      this._buffer = Buffer.from(value);
    } else {
      this._buffer = Buffer.alloc(1);
    }
  }
  override get value(): number {
    return this._buffer.readUInt8();
  }
}

export class UInt16 extends DataType {
  constructor(value?: number | Uint8Array) {
    super();
    if (typeof value === 'number') {
      if (value < 0 || value > 65535)
        throw new Error('UInt16 value must be between 0 and 65535');
      this._buffer = Buffer.alloc(2);
      this._buffer.writeUInt16LE(value);
    } else if (value instanceof Uint8Array) {
      this._buffer = Buffer.from(value);
    } else {
      this._buffer = Buffer.alloc(2);
    }
  }
  override get value(): number {
    return this._buffer.readUInt16LE();
  }
}

export class UInt32 extends DataType {
  constructor(value?: number | Uint8Array) {
    super();
    if (typeof value === 'number') {
      if (value < 0 || value > 4294967295)
        throw new Error('UInt32 value must be between 0 and 4294967295');
      this._buffer = Buffer.alloc(4);
      this._buffer.writeUInt32LE(value);
    } else if (value instanceof Uint8Array) {
      this._buffer = Buffer.from(value);
    } else {
      this._buffer = Buffer.alloc(4);
    }
  }
  override get value(): number {
    return this._buffer.readUInt32LE();
  }
}

export class Float extends DataType {
  constructor(value?: number | Uint8Array) {
    super();
    if (typeof value === 'number') {
      if (value < -3.40282347e38 || value > 3.40282347e38)
        throw new Error(
          'Float value must be between -3.40282347e+38 and 3.40282347e+38'
        );
      this._buffer = Buffer.alloc(4);
      this._buffer.writeFloatLE(value);
    } else if (value instanceof Uint8Array) {
      this._buffer = Buffer.from(value);
    } else {
      this._buffer = Buffer.alloc(4);
    }
  }
  override get value(): number {
    return this._buffer.readFloatLE();
  }
}

export class Double extends DataType {
  constructor(value?: number | Uint8Array) {
    super();
    if (typeof value === 'number') {
      this._buffer = Buffer.alloc(8);
      this._buffer.writeDoubleLE(value);
    } else if (value instanceof Uint8Array) {
      this._buffer = Buffer.from(value);
    } else {
      this._buffer = Buffer.alloc(8);
    }
  }
  override get value(): number {
    return this._buffer.readDoubleLE();
  }
}

export type DataTypeConstructor<T extends DataType> = new (...args: any[]) => T;
