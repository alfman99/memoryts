// export abstract class DynamicDataType {
//   protected buffer: Buffer;
//   abstract get value(): any;

//   constructor() {
//     this.buffer = Buffer.alloc(0);
//   }
// }

export abstract class DataType {
  protected buffer: Buffer;
  abstract byteSize: number;

  constructor() {
    this.buffer = Buffer.alloc(0);
  }

  setBuffer(buffer: Buffer): void {
    this.buffer = buffer;
  }

  abstract get value(): any;
}

export class Bit extends DataType {
  readonly byteSize = 1;
  override get value(): number {
    return this.buffer[0] & 1;
  }
}

export class Bool extends DataType {
  readonly byteSize = 1;
  override get value(): boolean {
    return this.buffer[0] === 1;
  }
}

export class Char extends DataType {
  readonly byteSize = 1;
  override get value(): string {
    return String.fromCharCode(this.buffer[0]);
  }
}

export class Short extends DataType {
  readonly byteSize = 2;
  override get value(): number {
    return (this.buffer[1] << 8) | (this.buffer[0] << 0);
  }
}

export class Int8 extends DataType {
  readonly byteSize = 4;
  override get value(): number {
    return this.buffer.readInt8(0);
  }
}

export class Float extends DataType {
  readonly byteSize = 4;
  override get value(): number {
    return this.buffer.readFloatLE(0);
  }
}

export class Double extends DataType {
  readonly byteSize = 8;
  override get value(): number {
    return this.buffer.readDoubleLE(0);
  }
}

export class TArray<T extends DataType> extends DataType {
  // Not used here but needed for other classes
  readonly byteSize: number = NaN;

  private readonly elementSize: number;
  readonly size: number;

  constructor(private itemType: DataTypeConstructor<T>, public length: number) {
    super();
    const elementByteSize = new this.itemType().byteSize;

    this.elementSize = elementByteSize;
    this.size = elementByteSize * length;

    console.log('byteSize: ', this.size);
  }

  get value(): T[] {
    const result: T[] = [];
    for (let i = 0; i < this.length; i++) {
      const itemBuffer = this.buffer.slice(
        i * this.elementSize,
        (i + 1) * this.elementSize
      );
      const item = new this.itemType();
      item.setBuffer(itemBuffer);
      result.push(item);
    }
    return result;
  }
}

export type DataTypeConstructor<T extends DataType> = new (...args: any[]) => T;
